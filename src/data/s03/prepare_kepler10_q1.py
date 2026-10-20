"""Extract a compact, auditable Kepler-10 Q1 light-curve window.

Run from the repository root with Python, Astropy and NumPy installed:
    python src/data/s03/prepare_kepler10_q1.py

The script reads the public MAST FITS snapshot stored alongside it. It retains
the original quality bitmask and flux uncertainty, and records the exact source
file hash in the derived JSON.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import numpy as np
from astropy.io import fits


HERE = Path(__file__).resolve().parent
SOURCE = HERE / "kplr011904151-2009166043257_llc.fits"
OUTPUT = HERE / "kepler10-q1-transit-window.json"
SOURCE_URL = (
    "https://archive.stsci.edu/missions/kepler/lightcurves/0119/011904151/"
    "kplr011904151-2009166043257_llc.fits"
)
DISCOVERY_EPOCH_BJD_TDB = 2454964.57375
DISCOVERY_PERIOD_DAYS = 0.837495
WINDOW_CENTER_BJD_TDB = DISCOVERY_EPOCH_BJD_TDB + DISCOVERY_PERIOD_DAYS
WINDOW_HALF_WIDTH_DAYS = 0.25
BJDREF = 2454833.0


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def as_float(value: object) -> float:
    return float(value)


def main() -> None:
    source_hash = sha256(SOURCE)
    with fits.open(SOURCE, checksum=False) as hdus:
        lightcurve = hdus[1].data
        header = hdus[1].header
        primary_header = hdus[0].header
        time = np.asarray(lightcurve["TIME"], dtype=float)
        flux = np.asarray(lightcurve["PDCSAP_FLUX"], dtype=float)
        flux_err = np.asarray(lightcurve["PDCSAP_FLUX_ERR"], dtype=float)
        quality = np.asarray(lightcurve["SAP_QUALITY"], dtype=np.int64)
        finite = np.isfinite(time) & np.isfinite(flux) & np.isfinite(flux_err)
        quality_zero = quality == 0
        usable_for_reference = finite & quality_zero
        reference_flux = float(np.nanmedian(flux[usable_for_reference]))
        bjd_tdb = time + float(header["BJDREFI"]) + float(header.get("BJDREFF", 0.0))
        selected = (
            finite
            & (np.abs(bjd_tdb - WINDOW_CENTER_BJD_TDB) <= WINDOW_HALF_WIDTH_DAYS)
        )
        flag_values, flag_counts = np.unique(quality, return_counts=True)
        quality_counts = [
            {"sap_quality": int(flag), "rows": int(count)}
            for flag, count in zip(flag_values, flag_counts, strict=True)
        ]
        rows = []
        for index in np.flatnonzero(selected):
            relative_flux_ppm = (flux[index] / reference_flux - 1.0) * 1_000_000.0
            relative_flux_err_ppm = (flux_err[index] / reference_flux) * 1_000_000.0
            rows.append(
                {
                    "bjd_minus_2454833": as_float(time[index]),
                    "pdcsap_flux": as_float(flux[index]),
                    "pdcsap_flux_err": as_float(flux_err[index]),
                    "relative_flux_ppm": as_float(relative_flux_ppm),
                    "relative_flux_err_ppm": as_float(relative_flux_err_ppm),
                    "sap_quality": int(quality[index]),
                }
            )

        document = {
            "schema_version": 1,
            "evidence_type": "observed_archival_data",
            "metadata": {
                "target": "Kepler-10",
                "kic": 11904151,
                "product_filename": SOURCE.name,
                "source_url": SOURCE_URL,
                "source_sha256": source_hash,
                "time_system": "BJD_TDB",
                "time_column": "TIME",
                "time_native_unit": "d",
                "time_native_definition": "BJD_TDB - 2454833",
                "bjdrefi": int(header["BJDREFI"]),
                "bjdreff": float(header.get("BJDREFF", 0.0)),
                "flux_column": "PDCSAP_FLUX",
                "flux_error_column": "PDCSAP_FLUX_ERR",
                "flux_unit": "e-/s",
                "quality_column": "SAP_QUALITY",
                "quarter": {
                    "number": int(primary_header["QUARTER"]),
                    "cadence": "long cadence",
                    "total_rows": int(len(lightcurve)),
                    "finite_flux_rows": int(np.count_nonzero(finite)),
                    "zero_quality_rows": int(np.count_nonzero(quality_zero)),
                    "finite_zero_quality_rows": int(np.count_nonzero(usable_for_reference)),
                    "quality_counts": quality_counts,
                },
                "normalization": {
                    "reference": "median PDCSAP_FLUX over finite Q1 rows with SAP_QUALITY == 0",
                    "reference_flux_e_per_s": reference_flux,
                    "relative_flux": "(PDCSAP_FLUX / reference_flux - 1) * 1e6",
                    "relative_flux_unit": "ppm",
                    "relative_error": "PDCSAP_FLUX_ERR / reference_flux * 1e6",
                    "relative_error_unit": "ppm",
                },
                "window": {
                    "center_bjd_tdb": WINDOW_CENTER_BJD_TDB,
                    "center_definition": "published discovery epoch + one published orbital period",
                    "half_width_days": WINDOW_HALF_WIDTH_DAYS,
                    "row_count": len(rows),
                },
            },
            "rows": rows,
        }
    OUTPUT.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT.name}: {len(rows)} rows; source SHA-256 {source_hash}")


if __name__ == "__main__":
    main()
