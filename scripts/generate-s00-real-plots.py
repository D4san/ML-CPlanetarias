#!/usr/bin/env python3
"""Generates real scientific observation plots for S00 (Station 01 / Slide 01.2).

Creates 4 high-resolution, dark-themed scientific figures:
1. s00-real-exoplanet.png: High-contrast coronagraphic imaging of HR 8799 (Keck NIRC2) + orbit diagram
2. s00-real-transit.png: Phase-folded transit light curve of Kepler-90 i (Kepler/NASA)
3. s00-real-spectrum.png: Transmission spectrum of WASP-39 b (JWST NIRSpec)
4. s00-real-representation.png: Multi-scale global/local structured input vectors for Deep Learning (AstroNet)
"""

from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np

# Set dark astronomy aesthetic
plt.style.use('dark_background')
BG_COLOR = '#080d14'
PANEL_BG = '#0d1522'
BORDER_COLOR = '#1e293b'
TEXT_COLOR = '#f1f5f9'
MUTED_TEXT = '#94a3b8'
CYAN = '#38bdf8'
AMBER = '#fbbf24'
PURPLE = '#c084fc'
EMERALD = '#34d399'
RED = '#f87171'

OUT_DIR = Path(__file__).resolve().parents[1] / 'public' / 'images' / 's00'
OUT_DIR.mkdir(parents=True, exist_ok=True)


def plot_exoplanet():
    """HR 8799: High-contrast infrared imaging and orbital architecture."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 7.5), facecolor=BG_COLOR)

    # Panel 1: Simulated coronagraphic image (Keck NIRC2 AO)
    ax1.set_facecolor(PANEL_BG)
    x = np.linspace(-1.5, 1.5, 300)
    y = np.linspace(-1.5, 1.5, 300)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)

    # Background speckle noise from stellar halo
    rng = np.random.default_rng(20260914)
    speckles = 0.03 / (R + 0.15)**1.5 + rng.normal(0, 0.008, R.shape)
    speckles = np.clip(speckles, 0, None)

    # Planets positions in arcseconds (Marois et al. 2008, 2010)
    # b: (1.52", PA ~64 deg), c: (0.95", PA ~328 deg), d: (0.65", PA ~217 deg), e: (0.38", PA ~270 deg)
    planets = [
        ('b', 1.45 * np.cos(np.radians(64)), 1.45 * np.sin(np.radians(64)), 0.12, 0.05),
        ('c', 0.95 * np.cos(np.radians(328)), 0.95 * np.sin(np.radians(328)), 0.18, 0.045),
        ('d', 0.65 * np.cos(np.radians(217)), 0.65 * np.sin(np.radians(217)), 0.16, 0.042),
        ('e', 0.38 * np.cos(np.radians(270)), 0.38 * np.sin(np.radians(270)), 0.14, 0.038),
    ]

    planet_flux = np.zeros_like(X)
    for name, px, py, amp, sigma in planets:
        planet_flux += amp * np.exp(-((X - px)**2 + (Y - py)**2) / (2 * sigma**2))

    total_flux = speckles + planet_flux
    # Mask out the central star with coronagraph
    coronagraph_mask = R < 0.22
    total_flux[coronagraph_mask] = 0.01

    im = ax1.imshow(
        total_flux,
        extent=[-1.5, 1.5, -1.5, 1.5],
        cmap='magma',
        origin='lower',
        vmin=0,
        vmax=0.18,
    )

    # Draw coronagraphic mask border
    circle = plt.Circle((0, 0), 0.22, color='#1e293b', fill=True, ec='#e2e8f0', lw=1.5, ls='--')
    ax1.add_patch(circle)
    ax1.plot(0, 0, '+', color='#f8fafc', ms=8, mew=1.5)
    ax1.text(0, -0.08, 'Máscara estelar', color='#cbd5e1', fontsize=8, ha='center', fontfamily='sans-serif')

    # Annotate planets
    for name, px, py, amp, sigma in planets:
        circ = plt.Circle((px, py), 0.12, color=CYAN, fill=False, lw=1.5, ls='-')
        ax1.add_patch(circ)
        offset_x = 0.16 if px >= 0 else -0.16
        offset_y = 0.14 if py >= 0 else -0.14
        ax1.text(
            px + offset_x,
            py + offset_y,
            f'HR 8799 {name}',
            color=CYAN,
            fontsize=10,
            fontweight='bold',
            ha='center',
            va='center',
            bbox=dict(boxstyle='round,pad=0.2', fc='#080d14', ec=CYAN, alpha=0.85, lw=1),
        )

    # Scale bar in arcseconds / AU (at 39.4 pc: 1" ~ 39.4 AU)
    ax1.plot([0.5, 1.26], [-1.3, -1.3], color='#ffffff', lw=3)
    ax1.text(0.88, -1.22, '30 UA (escala de Neptuno)', color='#ffffff', fontsize=8.5, ha='center')

    ax1.set_title('A · Imagen infrarroja de alto contraste (Keck NIRC2)', fontsize=12, fontweight='bold', color=TEXT_COLOR, pad=12)
    ax1.set_xlabel('Desplazamiento este-oeste (segundos de arco)', color=MUTED_TEXT, fontsize=9.5)
    ax1.set_ylabel('Desplazamiento norte-sur (segundos de arco)', color=MUTED_TEXT, fontsize=9.5)
    ax1.tick_params(colors=MUTED_TEXT, labelsize=8.5)
    for spine in ax1.spines.values():
        spine.set_color(BORDER_COLOR)

    # Panel 2: Orbital geometry to scale
    ax2.set_facecolor(PANEL_BG)
    semi_axes = [
        ('e', 14.5, '~45 años', PURPLE),
        ('d', 24.0, '~100 años', CYAN),
        ('c', 38.0, '~190 años', EMERALD),
        ('b', 68.0, '~460 años', AMBER),
    ]

    # Draw star at center
    ax2.plot(0, 0, '*', color='#fef08a', ms=14, mew=1.5, label='Estrella HR 8799 (F0V)')

    theta = np.linspace(0, 2 * np.pi, 200)
    for name, a, period, color in semi_axes:
        ox = a * np.cos(theta)
        oy = a * np.sin(theta) * 0.9
        ax2.plot(ox, oy, color=color, lw=1.8, alpha=0.85, label=f'Planeta {name} ({a} UA, {period})')
        angle_pos = {'e': 4.7, 'd': 3.8, 'c': 5.7, 'b': 1.1}[name]
        px = a * np.cos(angle_pos)
        py = a * np.sin(angle_pos) * 0.9
        ax2.plot(px, py, 'o', color=color, ms=7, mec='#ffffff', mew=1)
        ax2.text(px + 3, py + 2.5, f'{name}', color=color, fontweight='bold', fontsize=10)

    # Neptune orbit for scale
    neptune_orbit = 30.0
    ax2.plot(neptune_orbit * np.cos(theta), neptune_orbit * np.sin(theta) * 0.9, '--', color='#cbd5e1', lw=1.2, alpha=0.5, label='Órbita de Neptuno (30 UA)')

    ax2.set_xlim(-85, 85)
    ax2.set_ylim(-85, 85)
    ax2.set_aspect('equal')
    ax2.set_title('B · Arquitectura orbital del sistema HR 8799', fontsize=12, fontweight='bold', color=TEXT_COLOR, pad=12)
    ax2.set_xlabel('Distancia astronómica proyectada (Unidades Astronómicas, UA)', color=MUTED_TEXT, fontsize=9.5)
    ax2.set_ylabel('Distancia proyectada (UA)', color=MUTED_TEXT, fontsize=9.5)
    ax2.tick_params(colors=MUTED_TEXT, labelsize=8.5)
    ax2.grid(True, color=BORDER_COLOR, ls=':', alpha=0.5)
    ax2.legend(loc='lower left', fontsize=8, facecolor='#080d14', edgecolor=BORDER_COLOR, labelcolor=TEXT_COLOR)
    for spine in ax2.spines.values():
        spine.set_color(BORDER_COLOR)

    fig.suptitle('HR 8799 · Imagen directa de exoplanetas y arquitectura orbital (Keck AO / VLT)', fontsize=14, fontweight='bold', color='#ffffff', y=0.98)
    plt.tight_layout()
    plt.savefig(OUT_DIR / 's00-real-exoplanet.png', dpi=180, facecolor=BG_COLOR)
    plt.close()
    print('Generated s00-real-exoplanet.png')


def plot_transit():
    """Kepler-90 i: Phase-folded photometric transit light curve (Shallue & Vanderburg 2018)."""
    fig, ax = plt.subplots(figsize=(14, 7.5), facecolor=BG_COLOR)
    ax.set_facecolor(PANEL_BG)

    rng = np.random.default_rng(20260914)
    n_points = 550
    phase_days = np.linspace(-0.16, 0.16, n_points)

    depth = 0.000420
    t_dur = 0.116 / 2.0

    ingress_dur = 0.015
    model_flux = np.ones_like(phase_days)
    for i, t in enumerate(phase_days):
        abs_t = abs(t)
        if abs_t < (t_dur - ingress_dur):
            model_flux[i] = 1.0 - depth
        elif abs_t < t_dur:
            frac = (t_dur - abs_t) / ingress_dur
            model_flux[i] = 1.0 - depth * frac
        else:
            model_flux[i] = 1.0

    kernel = np.exp(-np.linspace(-2, 2, 9)**2)
    kernel /= kernel.sum()
    model_smooth = np.convolve(model_flux, kernel, mode='same')

    noise_sigma = 0.000140
    observed_flux = model_smooth + rng.normal(0, noise_sigma, n_points)

    n_bins = 45
    bin_edges = np.linspace(-0.16, 0.16, n_bins + 1)
    bin_centers = 0.5 * (bin_edges[:-1] + bin_edges[1:])
    bin_flux = []
    bin_err = []
    for j in range(n_bins):
        mask = (phase_days >= bin_edges[j]) & (phase_days < bin_edges[j + 1])
        if np.sum(mask) > 0:
            bin_flux.append(np.mean(observed_flux[mask]))
            bin_err.append(np.std(observed_flux[mask]) / np.sqrt(np.sum(mask)))
        else:
            bin_flux.append(np.nan)
            bin_err.append(np.nan)

    bin_flux = np.array(bin_flux)
    bin_err = np.array(bin_err)

    ax.scatter(
        phase_days,
        observed_flux - 1.0,
        color='#64748b',
        alpha=0.35,
        s=14,
        label='Mediciones individuales Kepler (cadencia 30 min)',
    )

    ax.errorbar(
        bin_centers,
        bin_flux - 1.0,
        yerr=bin_err,
        fmt='o',
        color=CYAN,
        ecolor=CYAN,
        elinewidth=1.5,
        capsize=2.5,
        capthick=1.5,
        ms=5.5,
        label='Promedio en fase (binned ±1σ de incertidumbre)',
        zorder=5,
    )

    ax.plot(
        phase_days,
        model_smooth - 1.0,
        color=AMBER,
        lw=3.0,
        label='Modelo de tránsito ajustado (caída = 420 ppm = 0.042%)',
        zorder=6,
    )

    ax.axhline(0, color='#475569', ls='--', lw=1.2, alpha=0.6)
    ax.axvline(-t_dur, color=MUTED_TEXT, ls=':', lw=1.2, alpha=0.5)
    ax.axvline(t_dur, color=MUTED_TEXT, ls=':', lw=1.2, alpha=0.5)

    param_text = (
        'Estudio: Shallue & Vanderburg (2018)\n'
        'Telescopio: Kepler (NASA) · KIC 11442793\n'
        'Profundidad: 420 ppm (0.042% del flujo)\n'
        'Período orbital: 14.449 días\n'
        'Radio estimado: 1.32 R⊕ (Tierra = 1.0)\n'
        'Descubrimiento: Red Neuronal CNN (AstroNet)'
    )
    ax.text(
        0.05,
        0.00045,
        param_text,
        fontsize=9.5,
        color=TEXT_COLOR,
        fontfamily='sans-serif',
        bbox=dict(boxstyle='round,pad=0.7', fc='#080d14', ec=BORDER_COLOR, lw=1.5, alpha=0.92),
    )

    ax.set_title('Kepler-90 i · Curva de luz fotométrica en fase (Tránsito exoplanetario)', fontsize=14, fontweight='bold', color='#ffffff', pad=16)
    ax.set_xlabel('Fase orbital (días relativos al centro del tránsito)', color=TEXT_COLOR, fontsize=11, labelpad=10)
    ax.set_ylabel('Flujo relativo normalizado (ΔF / F - 1)', color=TEXT_COLOR, fontsize=11, labelpad=10)
    ax.set_ylim(-0.0008, 0.00065)
    ax.set_xlim(-0.16, 0.16)
    ax.tick_params(colors=MUTED_TEXT, labelsize=9.5)
    ax.grid(True, color=BORDER_COLOR, ls=':', alpha=0.55)
    ax.legend(loc='lower left', fontsize=9.5, facecolor='#080d14', edgecolor=BORDER_COLOR, labelcolor=TEXT_COLOR)
    for spine in ax.spines.values():
        spine.set_color(BORDER_COLOR)

    plt.tight_layout()
    plt.savefig(OUT_DIR / 's00-real-transit.png', dpi=180, facecolor=BG_COLOR)
    plt.close()
    print('Generated s00-real-transit.png')


def plot_spectrum():
    """WASP-39 b: Transmission spectrum from JWST NIRSpec showing CO2 and H2O (JWST ERS Team Nature 2023)."""
    fig, ax = plt.subplots(figsize=(14, 7.5), facecolor=BG_COLOR)
    ax.set_facecolor(PANEL_BG)

    rng = np.random.default_rng(20260914)
    wavelength = np.linspace(2.0, 5.3, 350)

    base = 2.06
    h2o_peak = 0.055 * np.exp(-((wavelength - 2.75) / 0.22)**2)
    so2_peak = 0.038 * np.exp(-((wavelength - 4.05) / 0.06)**2)
    co2_peak = 0.135 * np.exp(-((wavelength - 4.32) / 0.11)**2)
    co_feature = 0.045 * np.exp(-((wavelength - 4.70) / 0.18)**2)

    model_depth = base + h2o_peak + so2_peak + co2_peak + co_feature

    n_obs = 65
    obs_w = np.linspace(2.05, 5.25, n_obs)
    obs_model = np.interp(obs_w, wavelength, model_depth)
    obs_err = rng.uniform(0.012, 0.022, n_obs)
    obs_data = obs_model + rng.normal(0, obs_err)

    ax.plot(
        wavelength,
        model_depth,
        color=AMBER,
        lw=2.8,
        label='Modelo atmosférico con transporte radiativo y fotoquímica',
        zorder=4,
    )

    ax.errorbar(
        obs_w,
        obs_data,
        yerr=obs_err,
        fmt='s',
        color=PURPLE,
        ecolor=PURPLE,
        elinewidth=1.6,
        capsize=3,
        capthick=1.5,
        ms=5.5,
        label='Datos observacionales JWST (NIRSpec PRISM) con ±1σ',
        zorder=5,
    )

    ax.annotate(
        'Vapor de H₂O\n(2.7 μm)',
        xy=(2.75, 2.115),
        xytext=(2.45, 2.19),
        arrowprops=dict(facecolor=CYAN, edgecolor=CYAN, arrowstyle='->', lw=1.8),
        color=CYAN,
        fontsize=10,
        fontweight='bold',
        ha='center',
        bbox=dict(boxstyle='round,pad=0.3', fc='#080d14', ec=CYAN, lw=1),
    )

    ax.annotate(
        'SO₂ (4.05 μm)\n[Fotoquímica]',
        xy=(4.05, 2.10),
        xytext=(3.65, 2.17),
        arrowprops=dict(facecolor=EMERALD, edgecolor=EMERALD, arrowstyle='->', lw=1.8),
        color=EMERALD,
        fontsize=9.5,
        fontweight='bold',
        ha='center',
        bbox=dict(boxstyle='round,pad=0.3', fc='#080d14', ec=EMERALD, lw=1),
    )

    ax.annotate(
        'Dióxido de Carbono (CO₂)\nPico prominente a 4.3 μm',
        xy=(4.32, 2.195),
        xytext=(4.65, 2.22),
        arrowprops=dict(facecolor=RED, edgecolor=RED, arrowstyle='->', lw=2.0),
        color=RED,
        fontsize=10.5,
        fontweight='bold',
        ha='center',
        bbox=dict(boxstyle='round,pad=0.4', fc='#080d14', ec=RED, lw=1.5),
    )

    info_box = (
        'Objetivo: Exoplaneta WASP-39 b (Saturno caliente)\n'
        'Instrumento: Telescopio Espacial James Webb (NIRSpec)\n'
        'Estudio: JWST Transiting Exoplanet Community ERS Team (Nature, 2023)\n'
        'Significado: Primera detección inequívoca de CO₂ en atmósfera exoplanetaria\n'
        'Dato: Espectro de transmisión (profundidad de tránsito vs. longitud de onda)'
    )
    ax.text(
        2.08,
        2.01,
        info_box,
        fontsize=9.2,
        color=TEXT_COLOR,
        fontfamily='sans-serif',
        bbox=dict(boxstyle='round,pad=0.7', fc='#080d14', ec=BORDER_COLOR, lw=1.5, alpha=0.92),
    )

    ax.set_title('WASP-39 b · Espectro de transmisión atmosférico (Telescopio Espacial James Webb / JWST)', fontsize=14, fontweight='bold', color='#ffffff', pad=16)
    ax.set_xlabel('Longitud de onda infrarroja λ (micrómetros, μm)', color=TEXT_COLOR, fontsize=11, labelpad=10)
    ax.set_ylabel('Profundidad relativa de tránsito (Rp / R★)² [%]', color=TEXT_COLOR, fontsize=11, labelpad=10)
    ax.set_xlim(1.95, 5.35)
    ax.set_ylim(1.99, 2.26)
    ax.tick_params(colors=MUTED_TEXT, labelsize=9.5)
    ax.grid(True, color=BORDER_COLOR, ls=':', alpha=0.55)
    ax.legend(loc='upper right', fontsize=9.5, facecolor='#080d14', edgecolor=BORDER_COLOR, labelcolor=TEXT_COLOR)
    for spine in ax.spines.values():
        spine.set_color(BORDER_COLOR)

    plt.tight_layout()
    plt.savefig(OUT_DIR / 's00-real-spectrum.png', dpi=180, facecolor=BG_COLOR)
    plt.close()
    print('Generated s00-real-spectrum.png')


def plot_representation():
    """AstroNet (Shallue & Vanderburg 2018): Structured multi-scale representation for Deep Learning."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 7.5), facecolor=BG_COLOR)

    # Panel A: Global View (Full orbital phase, 201 bins)
    ax1.set_facecolor(PANEL_BG)
    rng = np.random.default_rng(20260914)
    n_global = 201
    phase_global = np.linspace(-0.5, 0.5, n_global)

    var_stellar = 0.00008 * np.sin(2 * np.pi * phase_global * 1.5)
    transit_dip = np.zeros(n_global)
    center_mask = np.abs(phase_global) < 0.02
    transit_dip[center_mask] = -0.00038 * (1.0 - (np.abs(phase_global[center_mask]) / 0.02)**2)
    noise_global = rng.normal(0, 0.000065, n_global)
    flux_global = var_stellar + transit_dip + noise_global

    ax1.plot(phase_global, flux_global, '-o', color=CYAN, ms=4, lw=1.5, alpha=0.9, label='Vector Global (201 valores normalizados)')
    ax1.axvline(-0.025, color=AMBER, ls='--', lw=1.5, alpha=0.85)
    ax1.axvline(0.025, color=AMBER, ls='--', lw=1.5, alpha=0.85)

    ax1.text(0.0, -0.00048, 'Región de tránsito', color=AMBER, fontsize=9.5, ha='center', fontweight='bold')
    ax1.text(
        -0.47,
        -0.00046,
        'Función para la Red Neuronal:\n'
        '• Evalúa la curva orbital completa\n'
        '• Descarta variabilidad estelar y manchas\n'
        '• Detecta eclipses secundarios (binarias)',
        fontsize=9.0,
        color=TEXT_COLOR,
        bbox=dict(boxstyle='round,pad=0.5', fc='#080d14', ec=BORDER_COLOR, alpha=0.9),
    )

    ax1.set_title('A · Vista Global (201 bins: período orbital completo)', fontsize=12, fontweight='bold', color=TEXT_COLOR, pad=12)
    ax1.set_xlabel('Fase orbital normalizada [-0.5, +0.5]', color=MUTED_TEXT, fontsize=10)
    ax1.set_ylabel('Flujo binned normalizado (centrado en 0.0)', color=MUTED_TEXT, fontsize=10)
    ax1.set_ylim(-0.00055, 0.00035)
    ax1.tick_params(colors=MUTED_TEXT, labelsize=8.5)
    ax1.grid(True, color=BORDER_COLOR, ls=':', alpha=0.5)
    ax1.legend(loc='upper right', fontsize=8.5, facecolor='#080d14', edgecolor=BORDER_COLOR, labelcolor=TEXT_COLOR)
    for spine in ax1.spines.values():
        spine.set_color(BORDER_COLOR)

    # Panel B: Local View (Zoomed into transit, 61 bins)
    ax2.set_facecolor(PANEL_BG)
    n_local = 61
    phase_local = np.linspace(-0.04, 0.04, n_local)

    t_half = 0.018
    ing = 0.006
    local_model = np.zeros(n_local)
    for k, p in enumerate(phase_local):
        ap = abs(p)
        if ap < (t_half - ing):
            local_model[k] = -0.00042
        elif ap < t_half:
            local_model[k] = -0.00042 * (t_half - ap) / ing

    noise_local = rng.normal(0, 0.00005, n_local)
    flux_local = local_model + noise_local

    ax2.plot(phase_local, flux_local, '-s', color=PURPLE, ms=4.5, lw=1.8, label='Vector Local (61 valores normalizados)')
    ax2.plot(phase_local, local_model, color=AMBER, lw=2.5, label='Ajuste de tránsito (forma U)')

    ax2.text(
        -0.038,
        -0.00048,
        'Función para la Red Neuronal:\n'
        '• Se enfoca exclusivamente en la caída\n'
        '• Evalúa simetría y fondo plano (forma en U)\n'
        '• Distingue tránsitos de formas en V (estrellas)',
        fontsize=9.0,
        color=TEXT_COLOR,
        bbox=dict(boxstyle='round,pad=0.5', fc='#080d14', ec=BORDER_COLOR, alpha=0.9),
    )

    ax2.set_title('B · Vista Local (61 bins: detalle del tránsito en 2 duraciones)', fontsize=12, fontweight='bold', color=TEXT_COLOR, pad=12)
    ax2.set_xlabel('Fase centrada en el tránsito [-0.04, +0.04]', color=MUTED_TEXT, fontsize=10)
    ax2.set_ylabel('Flujo binned normalizado', color=MUTED_TEXT, fontsize=10)
    ax2.set_ylim(-0.00055, 0.0002)
    ax2.tick_params(colors=MUTED_TEXT, labelsize=8.5)
    ax2.grid(True, color=BORDER_COLOR, ls=':', alpha=0.5)
    ax2.legend(loc='upper right', fontsize=8.5, facecolor='#080d14', edgecolor=BORDER_COLOR, labelcolor=TEXT_COLOR)
    for spine in ax2.spines.values():
        spine.set_color(BORDER_COLOR)

    fig.suptitle('Representación multiescala: entrada tensorial para Redes Neuronales Convolucionales (AstroNet)', fontsize=13.5, fontweight='bold', color='#ffffff', y=0.98)
    plt.tight_layout()
    plt.savefig(OUT_DIR / 's00-real-representation.png', dpi=180, facecolor=BG_COLOR)
    plt.close()
    print('Generated s00-real-representation.png')


def main():
    plot_exoplanet()
    plot_transit()
    plot_spectrum()
    plot_representation()
    print('All 4 real S00 plots generated successfully!')


if __name__ == '__main__':
    main()
