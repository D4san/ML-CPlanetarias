#!/usr/bin/env python3
"""Generates conceptual line-art miniatures for S00 (Stations 05, 06, 08).

Adheres strictly to the MLCP editorial line-art v1 family:
- Canvas: 1774 x 887, RGBA with pure transparent alpha background (0, 0, 0, 0)
- Minimalist, clean vector strokes with line width 3.5 - 5.0 pt
- Semantic palette from tokens.css:
  * Data/Observable: #2dd4bf (teal / soft cyan)
  * Model/Mechanism: #818cf8 (indigo) / #c084fc (purple)
  * Decision/Baseline: #fbbf24 (amber)
  * Transfer/Science: #34d399 (emerald)
  * Limit/Warning: #f87171 (coral red)
- No technical text or words inside the image.
"""

from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle, Ellipse, FancyBboxPatch, Polygon
import numpy as np

OUT_DIR = Path(__file__).resolve().parents[1] / 'public' / 'images' / 's00' / 'miniatures'
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Colors matching tokens.css
TEAL = '#2dd4bf'
CYAN = '#38bdf8'
AMBER = '#fbbf24'
INDIGO = '#818cf8'
PURPLE = '#c084fc'
EMERALD = '#34d399'
RED = '#f87171'
MUTED = '#64748b'
LIGHT_MUTED = '#94a3b8'

DPI = 150
W_IN = 1774 / DPI
H_IN = 887 / DPI


def create_blank_canvas():
    fig = plt.figure(figsize=(W_IN, H_IN), dpi=DPI, facecolor='none')
    ax = fig.add_axes([0, 0, 1, 1], facecolor='none')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis('off')
    return fig, ax


def save_canvas(fig, filename):
    out_path = OUT_DIR / filename
    fig.savefig(out_path, format='png', dpi=DPI, transparent=True)
    plt.close(fig)
    print(f"Saved: {out_path.name}")


# ----------------------------------------------------
# STATION 05: CICLO DE VIDA DEL DATO
# ----------------------------------------------------

def generate_datos_observacion():
    """05.1 Observación: Telescopio apuntando a estrella y serie de luz continua."""
    fig, ax = create_blank_canvas()

    # Distant star
    ax.plot(2.0, 3.8, marker='*', markersize=26, color=AMBER, markeredgewidth=1.5, markeredgecolor=AMBER)
    circle = Circle((2.0, 3.8), 0.35, fill=False, edgecolor=AMBER, linewidth=1.5, linestyle='--', alpha=0.6)
    ax.add_patch(circle)

    # Light rays towards telescope
    ax.plot([2.3, 3.5], [3.6, 2.8], color=CYAN, linewidth=2, linestyle=':', alpha=0.8)
    ax.plot([2.2, 3.4], [3.4, 2.6], color=CYAN, linewidth=2, linestyle=':', alpha=0.8)

    # Telescope barrel angled towards the star
    ax.plot([3.1, 4.4], [2.7, 2.0], color=TEAL, linewidth=7.0, solid_capstyle='round')
    ax.plot([3.0, 3.2], [2.8, 2.5], color=CYAN, linewidth=6.0, solid_capstyle='round')  # lens hood
    ax.plot([4.4, 4.7], [2.0, 1.85], color=MUTED, linewidth=4.5, solid_capstyle='round')  # eyepiece
    # Mount joint
    mount = Circle((3.8, 2.25), 0.15, fill=True, color=TEAL)
    ax.add_patch(mount)
    # Tripod legs
    ax.plot([3.8, 3.3], [2.2, 0.8], color=TEAL, linewidth=3.5)
    ax.plot([3.8, 3.8], [2.2, 0.7], color=TEAL, linewidth=3.5)
    ax.plot([3.8, 4.3], [2.2, 0.8], color=TEAL, linewidth=3.5)

    # Continuous observation light curve on right side
    x = np.linspace(5.5, 9.2, 120)
    y = 2.5 + 0.15 * np.sin(3 * x) - 0.7 * np.exp(-((x - 7.3) / 0.4)**2)
    ax.plot(x, y, color=CYAN, linewidth=4)

    # Measurement points on curve
    idx_pts = [15, 35, 50, 60, 70, 85, 105]
    ax.plot(x[idx_pts], y[idx_pts], 'o', color=AMBER, markersize=10, markeredgecolor=TEAL, markeredgewidth=2)

    # Dashed baseline
    ax.plot([5.5, 9.2], [1.5, 1.5], color=MUTED, linewidth=2, linestyle='--', alpha=0.5)

    save_canvas(fig, 's00-datos-observacion.png')


def generate_datos_catalogo():
    """05.2 Catálogo: Matriz de datos tabular estructurada con metadatos."""
    fig, ax = create_blank_canvas()

    # Outer table border
    table_card = FancyBboxPatch((2.2, 0.8), 5.6, 3.4, boxstyle="round,pad=0.15",
                                linewidth=3.5, edgecolor=TEAL, facecolor='none')
    ax.add_patch(table_card)

    # Header bar
    ax.plot([2.2, 7.8], [3.4, 3.4], color=TEAL, linewidth=2.5)

    # Column dividers
    ax.plot([3.6, 3.6], [0.8, 4.2], color=MUTED, linewidth=1.5, linestyle=':')
    ax.plot([5.0, 5.0], [0.8, 4.2], color=MUTED, linewidth=1.5, linestyle=':')
    ax.plot([6.4, 6.4], [0.8, 4.2], color=MUTED, linewidth=1.5, linestyle=':')

    # Row dividers
    for y_row in [2.6, 1.8]:
        ax.plot([2.2, 7.8], [y_row, y_row], color=MUTED, linewidth=1.2, linestyle='--', alpha=0.6)

    # Header dots / icons
    for cx in [2.9, 4.3, 5.7, 7.1]:
        ax.plot(cx, 3.8, 's', color=AMBER, markersize=8)

    # Cell content pills
    rows = [3.0, 2.2, 1.3]
    cols = [2.9, 4.3, 5.7, 7.1]
    for r_idx, ry in enumerate(rows):
        for c_idx, cx in enumerate(cols):
            color = TEAL if (r_idx + c_idx) % 2 == 0 else CYAN
            if r_idx == 1 and c_idx == 2:
                color = AMBER  # Target highlighted cell
            ax.plot([cx - 0.4, cx + 0.4], [ry, ry], color=color, linewidth=4, solid_capstyle='round')

    save_canvas(fig, 's00-datos-catalogo.png')


def generate_datos_simulacion():
    """05.3 Simulación: Forward model inyectando tránsito analítico en señal sintética."""
    fig, ax = create_blank_canvas()

    # Generator gear / math node
    box = FancyBboxPatch((1.8, 1.4), 2.2, 2.2, boxstyle="round,pad=0.2",
                         linewidth=3.5, edgecolor=INDIGO, facecolor='none')
    ax.add_patch(box)
    circle = Circle((2.9, 2.5), 0.6, fill=False, edgecolor=PURPLE, linewidth=2.5)
    ax.add_patch(circle)
    for angle in np.linspace(0, 2*np.pi, 6, endpoint=False):
        gx = 2.9 + 0.75 * np.cos(angle)
        gy = 2.5 + 0.75 * np.sin(angle)
        ax.plot([2.9 + 0.55*np.cos(angle), gx], [2.5 + 0.55*np.sin(angle), gy], color=PURPLE, linewidth=3)

    # Arrow forward
    ax.annotate('', xy=(5.2, 2.5), xytext=(4.2, 2.5),
                arrowprops=dict(arrowstyle='->', color=PURPLE, lw=3, mutation_scale=20))

    # Synthetic injected light curve
    x = np.linspace(5.5, 8.8, 100)
    baseline = 3.2 + 0.08 * np.sin(6 * x)
    transit = - 0.9 * np.clip(1 - ((x - 7.15) / 0.5)**2, 0, 1)
    ax.plot(x, baseline, color=MUTED, linewidth=2.5, linestyle=':', alpha=0.8)
    ax.plot(x, baseline + transit, color=TEAL, linewidth=4)

    # Highlight injection dip
    ax.plot([7.15, 7.15], [2.3, 3.2], color=AMBER, linewidth=2, linestyle='--')
    ax.plot(7.15, 2.3, 'v', color=AMBER, markersize=10)

    save_canvas(fig, 's00-datos-simulacion.png')


def generate_datos_entrenamiento():
    """05.4 Entrenamiento: Partición train/val/test por estrellas independientes."""
    fig, ax = create_blank_canvas()

    # 3 Star clusters (systems)
    centers = [(2.5, 3.0), (5.0, 3.0), (7.5, 3.0)]
    labels_color = [TEAL, INDIGO, AMBER]

    for (cx, cy), col in zip(centers, labels_color):
        # Enclosing rounded boundary
        box = FancyBboxPatch((cx - 0.9, cy - 1.1), 1.8, 2.2, boxstyle="round,pad=0.15",
                             linewidth=3.0, edgecolor=col, facecolor='none')
        ax.add_patch(box)
        # Central star
        ax.plot(cx, cy + 0.3, marker='*', markersize=18, color=col)
        # Partition dots
        ax.plot([cx - 0.4, cx, cx + 0.4], [cy - 0.5, cy - 0.5, cy - 0.5], 'o', color=col, markersize=8)

    # Partition label bars below
    ax.plot([1.6, 3.4], [1.2, 1.2], color=TEAL, linewidth=4, solid_capstyle='round')
    ax.plot([4.1, 5.9], [1.2, 1.2], color=INDIGO, linewidth=4, solid_capstyle='round')
    ax.plot([6.6, 8.4], [1.2, 1.2], color=AMBER, linewidth=4, solid_capstyle='round')

    save_canvas(fig, 's00-datos-entrenamiento.png')


def generate_datos_salida():
    """05.5 Salida: Curva de calibración y vector de decisión final."""
    fig, ax = create_blank_canvas()

    # Coordinate box
    box = FancyBboxPatch((2.5, 0.8), 5.0, 3.4, boxstyle="round,pad=0.15",
                         linewidth=3.0, edgecolor=MUTED, facecolor='none')
    ax.add_patch(box)

    # Ideal diagonal
    ax.plot([2.9, 7.1], [1.2, 3.8], color=MUTED, linewidth=2, linestyle='--', alpha=0.6)

    # Sigmoid calibration curve
    x = np.linspace(2.9, 7.1, 80)
    norm_x = (x - 5.0) / 0.6
    y = 1.2 + 2.6 / (1 + np.exp(-norm_x))
    ax.plot(x, y, color=EMERALD, linewidth=4.5)

    # Operating decision threshold line
    ax.plot([5.0, 5.0], [0.8, 4.2], color=RED, linewidth=2.5, linestyle=':')
    ax.plot(5.0, 2.5, 'o', color=RED, markersize=11, markeredgecolor='#ffffff', markeredgewidth=2)

    save_canvas(fig, 's00-datos-salida.png')


# ----------------------------------------------------
# STATION 06: CINCO VERBOS DE ML
# ----------------------------------------------------

def generate_verb_detectar():
    """06.1 Detectar: Señal de tránsito que supera umbral de ruido."""
    fig, ax = create_blank_canvas()

    x = np.linspace(1.5, 8.5, 120)
    rng = np.random.default_rng(42)
    noise = 2.5 + rng.normal(0, 0.12, len(x))
    # Transit dip
    dip = - 0.9 * np.exp(-((x - 5.0) / 0.35)**2)
    signal = noise + dip

    # Detection threshold
    ax.plot([1.5, 8.5], [2.1, 2.1], color=RED, linewidth=2.5, linestyle='--', alpha=0.8)

    # Signal curve
    ax.plot(x, signal, color=TEAL, linewidth=3.5)

    # Detection bounding marker
    marker_box = FancyBboxPatch((4.3, 1.2), 1.4, 1.5, boxstyle="round,pad=0.1",
                                linewidth=2.5, edgecolor=AMBER, facecolor='none', linestyle='-')
    ax.add_patch(marker_box)
    ax.plot(5.0, 1.6, 'v', color=AMBER, markersize=11)

    save_canvas(fig, 's00-verb-detectar.png')


def generate_verb_clasificar():
    """06.2 Clasificar: Separación multiclase con frontera no lineal."""
    fig, ax = create_blank_canvas()

    # Class 1: Planeta (Teal circles)
    pts1_x = [2.5, 3.2, 3.0, 2.3, 3.8]
    pts1_y = [3.5, 3.8, 2.8, 2.9, 3.2]
    ax.plot(pts1_x, pts1_y, 'o', color=TEAL, markersize=12, markeredgewidth=2, markeredgecolor=TEAL)

    # Class 2: Binaria / Falso positivo (Amber diamonds)
    pts2_x = [6.5, 7.2, 7.8, 6.2, 7.5]
    pts2_y = [1.8, 2.4, 1.5, 2.2, 2.8]
    ax.plot(pts2_x, pts2_y, 'D', color=AMBER, markersize=11, markeredgewidth=2, markeredgecolor=AMBER)

    # Nonlinear decision boundary running between the two clusters
    by = np.linspace(0.8, 4.2, 80)
    bx = 5.0 + 0.7 * np.tanh((by - 2.5) * 1.8)
    ax.plot(bx, by, color=INDIGO, linewidth=4.0)

    save_canvas(fig, 's00-verb-clasificar.png')


def generate_verb_estimar():
    """06.3 Estimar: Distribución posterior bayesiana continua con barras de error."""
    fig, ax = create_blank_canvas()

    # Bell curve posterior
    x = np.linspace(2.5, 7.5, 100)
    y = 1.0 + 2.8 * np.exp(-((x - 5.0) / 0.9)**2)
    ax.plot(x, y, color=PURPLE, linewidth=4.0)

    # Shaded 68% credible region
    x_fill = np.linspace(4.1, 5.9, 50)
    y_fill = 1.0 + 2.8 * np.exp(-((x_fill - 5.0) / 0.9)**2)
    ax.fill_between(x_fill, 1.0, y_fill, color=PURPLE, alpha=0.25)

    # Central estimate line
    ax.plot([5.0, 5.0], [1.0, 3.8], color=AMBER, linewidth=3.0)
    ax.plot(5.0, 3.8, 'o', color=AMBER, markersize=9)

    # Uncertainty error bar
    ax.plot([4.1, 5.9], [2.2, 2.2], color=CYAN, linewidth=3.0)
    ax.plot([4.1, 4.1], [2.0, 2.4], color=CYAN, linewidth=3.0)
    ax.plot([5.9, 5.9], [2.0, 2.4], color=CYAN, linewidth=3.0)

    save_canvas(fig, 's00-verb-estimar.png')


def generate_verb_describir():
    """06.4 Describir: Espacio latente y agrupamiento morfológico (clustering)."""
    fig, ax = create_blank_canvas()

    # Latent manifold frame
    frame = FancyBboxPatch((2.2, 0.8), 5.6, 3.4, boxstyle="round,pad=0.15",
                           linewidth=2.5, edgecolor=MUTED, facecolor='none')
    ax.add_patch(frame)

    # Cluster A (Teal)
    ca_x = [3.2, 3.6, 3.9, 3.4, 3.7]
    ca_y = [3.2, 3.5, 3.1, 2.8, 3.4]
    ellipse_a = Ellipse((3.55, 3.2), 1.4, 1.1, angle=20, fill=False, edgecolor=TEAL, linewidth=2, linestyle='--')
    ax.add_patch(ellipse_a)
    ax.plot(ca_x, ca_y, 'o', color=TEAL, markersize=8)

    # Cluster B (Purple)
    cb_x = [6.2, 6.6, 6.9, 6.4, 6.7]
    cb_y = [1.8, 2.2, 1.7, 1.5, 2.0]
    ellipse_b = Ellipse((6.55, 1.85), 1.5, 1.2, angle=-15, fill=False, edgecolor=PURPLE, linewidth=2, linestyle='--')
    ax.add_patch(ellipse_b)
    ax.plot(cb_x, cb_y, 's', color=PURPLE, markersize=8)

    # Dimensionality reduction flow arrow
    ax.plot([4.5, 5.5], [2.5, 2.5], color=AMBER, linewidth=3.0, linestyle=':')

    save_canvas(fig, 's00-verb-describir.png')


def generate_verb_priorizar():
    """06.5 Priorizar: Cola de candidatos ordenada por utilidad y telescopio."""
    fig, ax = create_blank_canvas()

    # Stack of ranked candidate cards
    cards_y = [3.5, 2.6, 1.7, 0.8]
    widths = [4.6, 4.0, 3.4, 2.8]
    colors = [EMERALD, TEAL, CYAN, MUTED]

    for idx, (cy, w, col) in enumerate(zip(cards_y, widths, colors)):
        card = FancyBboxPatch((2.5, cy), w, 0.65, boxstyle="round,pad=0.08",
                              linewidth=3.0, edgecolor=col, facecolor='none')
        ax.add_patch(card)
        # Priority star on top item
        if idx == 0:
            ax.plot(2.9, cy + 0.32, marker='*', markersize=14, color=AMBER)
            ax.plot([3.4, 6.6], [cy + 0.32, cy + 0.32], color=EMERALD, linewidth=3.5, solid_capstyle='round')
        else:
            ax.plot([3.2, 2.5 + w - 0.4], [cy + 0.32, cy + 0.32], color=col, linewidth=2.5, solid_capstyle='round')

    # Telescope indicator on right
    ax.plot([7.6, 8.4], [3.2, 4.2], color=AMBER, linewidth=3.0)
    ax.plot(8.4, 4.2, 'o', color=AMBER, markersize=10)

    save_canvas(fig, 's00-verb-priorizar.png')


# ----------------------------------------------------
# STATION 08: TRES RAMAS DEL CURSO
# ----------------------------------------------------

def generate_branch_astronomia():
    """08.1 Rama Problema Astronómico: Planeta orbitando y rayo de observación."""
    fig, ax = create_blank_canvas()

    # Host star
    ax.plot(3.0, 2.5, marker='*', markersize=24, color=AMBER)

    # Orbit ellipse
    orbit = Ellipse((5.0, 2.5), 4.5, 2.2, fill=False, edgecolor=CYAN, linewidth=2.5, linestyle='--')
    ax.add_patch(orbit)

    # Planet
    ax.plot(6.8, 3.1, 'o', color=TEAL, markersize=18, markeredgecolor='#ffffff', markeredgewidth=2)

    # Science inquiry badge
    badge = FancyBboxPatch((6.0, 1.2), 2.2, 0.7, boxstyle="round,pad=0.1",
                           linewidth=2.5, edgecolor=TEAL, facecolor='none')
    ax.add_patch(badge)
    ax.plot([6.3, 7.9], [1.55, 1.55], color=TEAL, linewidth=3.0, solid_capstyle='round')

    save_canvas(fig, 's00-branch-astronomia.png')


def generate_branch_teoria():
    """08.2 Rama Teoría Formal ML: Red/mapeo formal y optimización."""
    fig, ax = create_blank_canvas()

    # Neural network nodes
    l1_y = [1.5, 2.5, 3.5]
    l2_y = [2.0, 3.0]
    l3_y = [2.5]

    x1, x2, x3 = 3.0, 5.0, 7.0

    # Draw weights
    for y1 in l1_y:
        for y2 in l2_y:
            ax.plot([x1, x2], [y1, y2], color=MUTED, linewidth=1.5, alpha=0.7)
    for y2 in l2_y:
        for y3 in l3_y:
            ax.plot([x2, x3], [y2, y3], color=PURPLE, linewidth=2.0)

    # Draw nodes
    for y1 in l1_y:
        ax.plot(x1, y1, 'o', color=TEAL, markersize=14, markeredgewidth=2, markeredgecolor='#ffffff')
    for y2 in l2_y:
        ax.plot(x2, y2, 'o', color=INDIGO, markersize=14, markeredgewidth=2, markeredgecolor='#ffffff')
    for y3 in l3_y:
        ax.plot(x3, y3, 'o', color=AMBER, markersize=16, markeredgewidth=2, markeredgecolor='#ffffff')

    save_canvas(fig, 's00-branch-teoria.png')


def generate_branch_aplicacion():
    """08.3 Rama Aplicación Reproducible: Pipeline de código y verificación."""
    fig, ax = create_blank_canvas()

    # Terminal / Code notebook window
    win = FancyBboxPatch((2.2, 0.8), 5.6, 3.4, boxstyle="round,pad=0.15",
                         linewidth=3.5, edgecolor=EMERALD, facecolor='none')
    ax.add_patch(win)

    # Title bar dots
    for cx in [2.7, 3.1, 3.5]:
        ax.plot(cx, 3.8, 'o', color=MUTED, markersize=6)

    # Code lines
    ax.plot([2.7, 5.2], [3.2, 3.2], color=CYAN, linewidth=3.5, solid_capstyle='round')
    ax.plot([3.2, 6.8], [2.6, 2.6], color=TEAL, linewidth=3.5, solid_capstyle='round')
    ax.plot([3.2, 5.8], [2.0, 2.0], color=AMBER, linewidth=3.5, solid_capstyle='round')

    # Verification checkmark badge on bottom right
    badge = Circle((6.8, 1.6), 0.55, fill=False, edgecolor=EMERALD, linewidth=2.5)
    ax.add_patch(badge)
    ax.plot([6.5, 6.75, 7.15], [1.55, 1.35, 1.85], color=EMERALD, linewidth=3.0, solid_capstyle='round')

    save_canvas(fig, 's00-branch-aplicacion.png')


# ----------------------------------------------------
# STATION 02: PILARES DE CIENCIAS PLANETARIAS
# ----------------------------------------------------

def generate_pillar_origen():
    """02.1 Pilar Origen: Disco protoplanetario, líneas de hielo y agregación de polvo centrados."""
    fig, ax = create_blank_canvas()

    # Central young protostar centered around (4.6, 2.5)
    cx, cy = 4.6, 2.5
    ax.plot(cx, cy, marker='o', markersize=22, color=AMBER)
    ax.plot(cx, cy, marker='o', markersize=14, color='#fef08a')

    # Protoplanetary disk rings (concentric ellipses)
    for a, b, col, ls in [
        (1.8, 0.6, TEAL, '-'),
        (2.7, 0.9, CYAN, '-'),
        (3.6, 1.2, INDIGO, '--'),  # Ice line / gap
        (4.3, 1.45, PURPLE, '-')
    ]:
        ellipse = Ellipse((cx, cy), a * 2, b * 2, angle=-10,
                          fill=False, edgecolor=col, linewidth=2.5, linestyle=ls, alpha=0.85)
        ax.add_patch(ellipse)

    # Dust grain agglomeration / planetesimal forming in the gap
    px, py = cx + 2.7, cy - 0.5
    ax.plot(px, py, marker='o', markersize=12, color=EMERALD, markeredgecolor=TEAL, markeredgewidth=2)
    # Infalling dust particles
    for dx, dy in [(-0.3, 0.2), (0.3, -0.15), (-0.2, -0.25), (0.25, 0.2)]:
        ax.plot(px + dx, py + dy, '.', color=AMBER, markersize=7)

    # Inflow arrows
    ax.annotate('', xy=(px, py), xytext=(px + 0.9, py + 0.3),
                arrowprops=dict(arrowstyle="->", color=CYAN, lw=2.0))
    ax.annotate('', xy=(px, py), xytext=(px - 0.8, py - 0.3),
                arrowprops=dict(arrowstyle="->", color=CYAN, lw=2.0))

    # Ice line label indicator (dashed line with cold marker)
    ax.plot([cx - 2.0, cx - 2.0], [cy + 1.1, cy + 1.9], color=INDIGO, linewidth=1.5, linestyle=':')
    ax.plot(cx - 2.0, cy + 1.9, marker='*', markersize=10, color=CYAN)

    save_canvas(fig, 's00-pillar-origen.png')


def generate_pillar_estructura():
    """02.2 Pilar Estructura: Corte transversal equilibrado de exoplaneta diferenciado en capas."""
    fig, ax = create_blank_canvas()

    cx, cy = 3.8, 2.5
    # Outer gaseous atmosphere envelope
    env = Circle((cx, cy), 2.1, fill=False, edgecolor=CYAN, linewidth=3.0, linestyle='--', alpha=0.9)
    ax.add_patch(env)

    # High pressure water / ice mantle layer
    ocean = Circle((cx, cy), 1.5, fill=False, edgecolor=TEAL, linewidth=4.0)
    ax.add_patch(ocean)

    # Silicate rocky mantle layer
    mantle = Circle((cx, cy), 0.95, fill=False, edgecolor=INDIGO, linewidth=5.0)
    ax.add_patch(mantle)

    # Metallic iron/nickel core
    core = Circle((cx, cy), 0.42, fill=True, color=AMBER)
    ax.add_patch(core)

    # Radial cutaway wedge on the right side
    wedge_x = [cx, cx + 2.1 * np.cos(np.deg2rad(30)), cx + 2.1 * np.cos(np.deg2rad(-30)), cx]
    wedge_y = [cy, cy + 2.1 * np.sin(np.deg2rad(30)), cy + 2.1 * np.sin(np.deg2rad(-30)), cy]
    ax.plot(wedge_x, wedge_y, color=MUTED, linewidth=1.5, linestyle=':')

    # Layer callout bars on the right
    bx1, bx2 = 6.8, 8.8
    ax.plot([bx1, bx2], [3.7, 3.7], color=CYAN, linewidth=3.0)      # Atmósfera H/He
    ax.plot([bx1, bx2], [2.9, 2.9], color=TEAL, linewidth=3.0)      # Océano / H2O
    ax.plot([bx1, bx2], [2.1, 2.1], color=INDIGO, linewidth=3.0)    # Manto silicatos
    ax.plot([bx1, bx2], [1.3, 1.3], color=AMBER, linewidth=3.0)     # Núcleo Fe-Ni

    # Connectors from planet to bars
    ax.plot([cx + 1.8, bx1], [cy + 1.0, 3.7], color=CYAN, linewidth=1.2, linestyle=':')
    ax.plot([cx + 1.3, bx1], [cy + 0.65, 2.9], color=TEAL, linewidth=1.2, linestyle=':')
    ax.plot([cx + 0.8, bx1], [cy + 0.35, 2.1], color=INDIGO, linewidth=1.2, linestyle=':')
    ax.plot([cx + 0.35, bx1], [cy, 1.3], color=AMBER, linewidth=1.2, linestyle=':')

    save_canvas(fig, 's00-pillar-estructura.png')


def generate_pillar_evolucion():
    """02.3 Pilar Evolución: Migración orbital, fotoevaporación atmosférica y marea."""
    fig, ax = create_blank_canvas()

    # Host star emitting high-energy irradiation
    ax.plot(2.0, 2.5, marker='o', markersize=26, color=AMBER)
    for angle in np.linspace(0, 2 * np.pi, 12, endpoint=False):
        ax.plot([2.0 + 0.4 * np.cos(angle), 2.0 + 0.7 * np.cos(angle)],
                [2.5 + 0.4 * np.sin(angle), 2.5 + 0.7 * np.sin(angle)],
                color=AMBER, linewidth=2.0)

    # High-energy UV/X-ray irradiation beam towards planet
    ax.plot([2.8, 5.0], [2.8, 3.0], color=RED, linewidth=2.0, linestyle=':')
    ax.plot([2.8, 5.0], [2.2, 2.0], color=RED, linewidth=2.0, linestyle=':')

    # Planet experiencing atmospheric stripping
    px, py = 5.5, 2.5
    planet = Circle((px, py), 0.7, fill=True, color=TEAL)
    ax.add_patch(planet)

    # Photoevaporative hydrodynamic outflow comet-like tail
    t = np.linspace(0, 3.0, 60)
    tail_upper = py + 0.5 + 0.25 * np.sqrt(t)
    tail_lower = py - 0.5 - 0.25 * np.sqrt(t)
    ax.plot(px + t, tail_upper, color=CYAN, linewidth=2.5, linestyle='--')
    ax.plot(px + t, tail_lower, color=CYAN, linewidth=2.5, linestyle='--')
    ax.plot(px + t, np.full_like(t, py), color=CYAN, linewidth=1.5, linestyle=':')

    # Dynamic orbital migration inward spiral arrow
    orbit_arc = np.linspace(0.4, 2.2, 50)
    ox = px - 0.8 * np.sin(orbit_arc)
    oy = py - 1.2 + 0.8 * np.cos(orbit_arc)
    ax.plot(ox, oy, color=INDIGO, linewidth=2.5, linestyle='--')
    ax.annotate('', xy=(ox[0], oy[0]), xytext=(ox[8], oy[8]),
                arrowprops=dict(arrowstyle="->", color=INDIGO, lw=2.5))

    save_canvas(fig, 's00-pillar-evolucion.png')


def generate_pillar_habitabilidad():
    """02.4 Pilar Habitabilidad: Zona circumstellar habitable, equilibrio térmico y biofirmas."""
    fig, ax = create_blank_canvas()

    # Host star
    ax.plot(1.8, 2.5, marker='o', markersize=22, color=AMBER)

    # Habitable Zone (green emerald ring band)
    hz_inner = Ellipse((1.8, 2.5), 5.4, 3.4, fill=False, edgecolor=EMERALD, linewidth=3.0, linestyle='--', alpha=0.7)
    hz_outer = Ellipse((1.8, 2.5), 7.8, 4.8, fill=False, edgecolor=EMERALD, linewidth=3.0, linestyle='--', alpha=0.7)
    ax.add_patch(hz_inner)
    ax.add_patch(hz_outer)

    # Earth-analog temperate planet positioned in habitable zone
    px, py = 5.2, 2.5
    planet = Circle((px, py), 0.65, fill=True, color='#0284c7')
    ax.add_patch(planet)
    # Continental patches / green vegetation
    patch1 = Circle((px - 0.2, py + 0.15), 0.25, fill=True, color=EMERALD)
    patch2 = Circle((px + 0.2, py - 0.2), 0.2, fill=True, color=EMERALD)
    ax.add_patch(patch1)
    ax.add_patch(patch2)
    # Atmosphere glow
    atmo = Circle((px, py), 0.78, fill=False, edgecolor=CYAN, linewidth=2.0)
    ax.add_patch(atmo)

    # Atmospheric thermal equilibrium arrows (incoming visible flux vs outgoing IR emission)
    ax.annotate('', xy=(px - 0.9, py), xytext=(px - 2.0, py),
                arrowprops=dict(arrowstyle="->", color=AMBER, lw=3.0))
    # Outgoing infrared wavy line
    ir_x = np.linspace(px + 0.9, px + 2.3, 40)
    ir_y = py + 0.25 * np.sin(10 * (ir_x - px))
    ax.plot(ir_x, ir_y, color=PURPLE, linewidth=2.5)
    ax.annotate('', xy=(px + 2.3, py), xytext=(px + 2.0, py),
                arrowprops=dict(arrowstyle="->", color=PURPLE, lw=2.0))

    # Biomarker spectral signal indicator on far right
    bx = np.linspace(7.6, 9.4, 60)
    by = 3.6 - 0.6 * np.exp(-((bx - 8.2) / 0.18)**2) - 0.8 * np.exp(-((bx - 8.9) / 0.22)**2)
    ax.plot(bx, by, color=TEAL, linewidth=2.5)
    ax.plot(8.2, 3.0, 'o', color=CYAN, markersize=6)     # O2 / O3
    ax.plot(8.9, 2.8, 'o', color=EMERALD, markersize=6)  # CH4 / H2O

    save_canvas(fig, 's00-pillar-habitabilidad.png')


# ----------------------------------------------------
# STATION 04: MODALIDADES DE MEDICIÓN
# ----------------------------------------------------

def generate_medicion_transito():
    """04.1 Medición Tránsito: Telescopio espacial observando eclipse y caída de luz."""
    fig, ax = create_blank_canvas()

    # Star being transited
    ax.plot(2.6, 3.4, marker='o', markersize=38, color=AMBER)
    ax.plot(2.6, 3.4, marker='o', markersize=26, color='#fef08a')

    # Transit chord path line
    ax.plot([1.2, 4.0], [3.4, 3.4], color=MUTED, linewidth=1.5, linestyle=':')
    # Transiting dark exoplanet silhouette
    ax.plot(2.9, 3.4, marker='o', markersize=12, color='#090d16', markeredgecolor=CYAN, markeredgewidth=2)

    # Space photometer telescope on right
    ax.plot([6.2, 7.8], [3.4, 3.4], color=TEAL, linewidth=6.0, solid_capstyle='round')
    # Solar panels
    ax.plot([6.8, 6.8], [2.4, 4.4], color=CYAN, linewidth=4.0)
    ax.plot([7.2, 7.2], [2.4, 4.4], color=CYAN, linewidth=4.0)

    # Differential light curve at bottom
    lx = np.linspace(1.5, 8.5, 120)
    ly = 1.6 - 0.7 * np.exp(-((lx - 5.0) / 0.8)**4)
    ax.plot(lx, ly, color=CYAN, linewidth=3.5)
    ax.plot([1.5, 8.5], [1.6, 1.6], color=MUTED, linewidth=1.5, linestyle='--', alpha=0.6)

    # Contact points markers
    ax.plot(4.2, 1.45, 'o', color=AMBER, markersize=8)
    ax.plot(5.8, 1.45, 'o', color=AMBER, markersize=8)

    save_canvas(fig, 's00-medicion-transito.png')


def generate_medicion_radial():
    """04.2 Medición Velocidad Radial: Bamboleo Doppler y espectrógrafo echelle."""
    fig, ax = create_blank_canvas()

    # Binary barycenter
    ax.plot(3.0, 3.2, marker='+', markersize=14, color=MUTED, markeredgewidth=2)

    # Star reflex orbit ellipse
    star_orb = Ellipse((3.0, 3.2), 1.8, 1.0, fill=False, edgecolor=MUTED, linewidth=1.5, linestyle='--')
    ax.add_patch(star_orb)
    # Wobbling star (Doppler blue-shifted approaching side)
    ax.plot(2.2, 3.6, marker='o', markersize=24, color=CYAN)
    ax.annotate('', xy=(1.6, 3.9), xytext=(2.2, 3.6),
                arrowprops=dict(arrowstyle="->", color=CYAN, lw=2.5))

    # Planet on opposite side of barycenter
    planet_orb = Ellipse((3.0, 3.2), 4.2, 2.4, fill=False, edgecolor=MUTED, linewidth=1.5, linestyle=':')
    ax.add_patch(planet_orb)
    ax.plot(4.8, 2.4, marker='o', markersize=10, color=INDIGO)

    # Doppler radial velocity sine curve
    vx = np.linspace(5.8, 9.2, 100)
    vy = 3.2 + 0.9 * np.sin(2.5 * (vx - 5.8))
    ax.plot(vx, vy, color=TEAL, linewidth=3.5)
    ax.plot([5.8, 9.2], [3.2, 3.2], color=MUTED, linewidth=1.5, linestyle='--', alpha=0.5)

    # Spectral absorption lines shift bar at bottom
    ax.plot([1.5, 8.5], [1.2, 1.2], color=MUTED, linewidth=3.0)
    for sx in [2.5, 3.8, 4.6, 6.0, 7.5]:
        ax.plot([sx, sx], [0.8, 1.6], color=AMBER, linewidth=2.5)
        # Shifted line
        ax.plot([sx + 0.25, sx + 0.25], [0.8, 1.6], color=CYAN, linewidth=2.5, linestyle='--')

    save_canvas(fig, 's00-medicion-radial.png')


def generate_medicion_espectro():
    """04.3 Medición Espectro: Filtrado atmosférico y espectro de transmisión JWST."""
    fig, ax = create_blank_canvas()

    # Host star backlighting
    ax.plot(1.8, 2.5, marker='o', markersize=42, color=AMBER)
    ax.plot(1.8, 2.5, marker='o', markersize=30, color='#fef08a')

    # Exoplanet crossing with luminous atmospheric transmission ring
    px, py = 4.2, 2.5
    planet_core = Circle((px, py), 1.0, fill=True, color='#090d16')
    ax.add_patch(planet_core)
    atmo_ring = Circle((px, py), 1.25, fill=False, edgecolor=CYAN, linewidth=3.5, alpha=0.95)
    ax.add_patch(atmo_ring)

    # Light rays passing through atmospheric ring
    for ray_y in [3.6, 1.4]:
        ax.plot([2.5, 5.5], [ray_y, ray_y], color=TEAL, linewidth=2.0, linestyle=':')

    # Transmission spectrum on right side with molecular absorption bands
    sx = np.linspace(5.8, 9.2, 100)
    # Transit depth D(lambda) with peaks for H2O and CO2
    sy = 2.0 + 0.7 * np.exp(-((sx - 6.8) / 0.25)**2) + 1.1 * np.exp(-((sx - 8.2) / 0.3)**2)
    ax.plot(sx, sy, color=CYAN, linewidth=3.5)
    ax.plot([5.8, 9.2], [2.0, 2.0], color=MUTED, linewidth=1.5, linestyle='--', alpha=0.5)

    # Observational points with error bars (JWST style)
    data_x = np.linspace(6.0, 9.0, 10)
    data_y = 2.0 + 0.7 * np.exp(-((data_x - 6.8) / 0.25)**2) + 1.1 * np.exp(-((data_x - 8.2) / 0.3)**2)
    ax.errorbar(data_x, data_y, yerr=0.18, fmt='o', color=AMBER, ecolor=TEAL, elinewidth=2.0, capsize=4)

    save_canvas(fig, 's00-medicion-espectro.png')


def generate_medicion_imagen():
    """04.4 Medición Imagen Directa: Coronógrafo, dark hole y detección de exoplaneta."""
    fig, ax = create_blank_canvas()

    cx, cy = 4.5, 2.5
    # Coronagraphic dark hole circular boundary
    dh = Circle((cx, cy), 2.2, fill=False, edgecolor=INDIGO, linewidth=2.5, linestyle='--')
    ax.add_patch(dh)

    # Central focal plane mask (blocking star)
    fpm = Circle((cx, cy), 0.75, fill=True, facecolor='#090d16', edgecolor=AMBER, linewidth=3.0)
    ax.add_patch(fpm)
    ax.plot(cx, cy, marker='+', markersize=16, color=AMBER, markeredgewidth=2)

    # Residual stellar speckle noise outside mask
    np.random.seed(42)
    for _ in range(35):
        rad = np.random.uniform(0.9, 2.1)
        ang = np.random.uniform(0, 2 * np.pi)
        ax.plot(cx + rad * np.cos(ang), cy + rad * np.sin(ang), '.', color=MUTED, markersize=5, alpha=0.6)

    # Faint exoplanet point source resolved in dark hole
    px, py = cx + 1.5, cy + 0.8
    ax.plot(px, py, marker='o', markersize=14, color=CYAN, markeredgecolor='#fef08a', markeredgewidth=2)
    # Target crosshair on companion
    ax.plot([px - 0.4, px + 0.4], [py, py], color=CYAN, linewidth=1.5)
    ax.plot([px, px], [py - 0.4, py + 0.4], color=CYAN, linewidth=1.5)

    # Optical bench deformable mirror schematic on left
    ax.plot([1.2, 1.2], [1.0, 4.0], color=TEAL, linewidth=5.0)
    for my in np.linspace(1.2, 3.8, 6):
        ax.plot([1.2, 1.7], [my, my], color=CYAN, linewidth=2.0)  # actuators

    save_canvas(fig, 's00-medicion-imagen.png')


# ----------------------------------------------------
# STATION 07: CASOS DE IMPACTO EN LITERATURA
# ----------------------------------------------------

def generate_impact_astronet():
    """07.1 AstroNet (Shallue & Vanderburg 2018): CNN 1D multiescala sobre Kepler."""
    fig, ax = create_blank_canvas()

    # Dual branch inputs (global view & local view)
    gx = np.linspace(1.5, 4.0, 50)
    gy = 3.6 - 0.5 * np.exp(-((gx - 2.8) / 0.3)**2)
    ax.plot(gx, gy, color=CYAN, linewidth=2.5)  # global

    lx = np.linspace(1.5, 4.0, 50)
    ly = 1.8 - 0.8 * np.exp(-((lx - 2.8) / 0.15)**2)
    ax.plot(lx, ly, color=TEAL, linewidth=2.5)  # local

    # CNN convolution boxes
    c1 = FancyBboxPatch((4.5, 3.1), 1.2, 1.0, boxstyle="round,pad=0.08",
                        linewidth=2.5, edgecolor=INDIGO, facecolor='none')
    c2 = FancyBboxPatch((4.5, 1.3), 1.2, 1.0, boxstyle="round,pad=0.08",
                        linewidth=2.5, edgecolor=INDIGO, facecolor='none')
    ax.add_patch(c1)
    ax.add_patch(c2)

    # Connectors from inputs to conv layers
    ax.plot([4.0, 4.5], [3.6, 3.6], color=CYAN, linewidth=2.0)
    ax.plot([4.0, 4.5], [1.8, 1.8], color=TEAL, linewidth=2.0)

    # Merged dense layer box
    dense = FancyBboxPatch((6.4, 2.0), 1.2, 1.4, boxstyle="round,pad=0.08",
                           linewidth=2.5, edgecolor=PURPLE, facecolor='none')
    ax.add_patch(dense)
    ax.plot([5.7, 6.4], [3.6, 2.7], color=INDIGO, linewidth=2.0)
    ax.plot([5.7, 6.4], [1.8, 2.7], color=INDIGO, linewidth=2.0)

    # Output prediction node: 98.8% probability
    ax.plot(8.6, 2.7, marker='o', markersize=20, color=EMERALD, markeredgecolor='#fef08a', markeredgewidth=2)
    ax.plot([7.6, 8.2], [2.7, 2.7], color=PURPLE, linewidth=2.5)

    save_canvas(fig, 's00-impact-astronet.png')


def generate_impact_estabilidad():
    """07.2 Estabilidad Orbital (Tamayo et al. 2020): Cadenas de resonancia y emulador N-cuerpos."""
    fig, ax = create_blank_canvas()

    # Central star
    ax.plot(2.5, 2.5, marker='o', markersize=24, color=AMBER)

    # Multi-planet resonant chain coplanar orbits
    for r, col, ang in [(1.5, TEAL, 45), (2.4, CYAN, 120), (3.3, INDIGO, 210), (4.2, PURPLE, 310)]:
        orb = Circle((2.5, 2.5), r, fill=False, edgecolor=col, linewidth=2.0, linestyle='--', alpha=0.8)
        ax.add_patch(orb)
        # Planet on orbit
        px = 2.5 + r * np.cos(np.deg2rad(ang))
        py = 2.5 + r * np.sin(np.deg2rad(ang))
        ax.plot(px, py, marker='o', markersize=9, color=col)

    # Stability phase manifold / boundary on right side
    mx = np.linspace(6.0, 9.0, 50)
    my = 2.5 + 0.8 * np.sin(mx)
    ax.plot(mx, my, color=EMERALD, linewidth=3.5)  # stable region
    ax.fill_between(mx, 0.8, my, color=EMERALD, alpha=0.15)
    ax.fill_between(mx, my, 4.2, color=RED, alpha=0.12)  # chaotic / unstable

    # Boundary separator
    ax.plot([6.0, 9.0], [4.2, 4.2], color=MUTED, linewidth=1.5, linestyle=':')

    save_canvas(fig, 's00-impact-estabilidad.png')


def generate_impact_atmosfera():
    """07.3 Inferencia Atmosférica (Vasist et al. 2023): Inversión bayesiana con SBI/NPE."""
    fig, ax = create_blank_canvas()

    # Input observation spectrum
    ix = np.linspace(1.2, 4.2, 60)
    iy = 2.8 + 0.5 * np.sin(6 * ix) - 0.4 * np.cos(12 * ix)
    ax.plot(ix, iy, color=CYAN, linewidth=2.5)
    ax.plot([1.2, 4.2], [1.8, 1.8], color=MUTED, linewidth=1.2, linestyle='--')

    # Neural network NPE block
    npe = FancyBboxPatch((4.7, 1.8), 1.3, 1.8, boxstyle="round,pad=0.1",
                         linewidth=2.5, edgecolor=INDIGO, facecolor='none')
    ax.add_patch(npe)
    ax.plot([4.2, 4.7], [2.7, 2.7], color=CYAN, linewidth=2.5)

    # Output 2D corner plot posterior contours on right
    cx, cy = 7.5, 2.7
    for rx, ry, col in [(1.4, 0.9, TEAL), (0.9, 0.6, CYAN), (0.4, 0.25, AMBER)]:
        contour = Ellipse((cx, cy), rx * 2, ry * 2, angle=35,
                          fill=False, edgecolor=col, linewidth=2.5, alpha=0.9)
        ax.add_patch(contour)

    # Maximum A Posteriori (MAP) point
    ax.plot(cx, cy, marker='+', markersize=12, color=AMBER, markeredgewidth=2.5)
    ax.plot([5.9, 6.6], [2.7, 2.7], color=INDIGO, linewidth=2.5)

    save_canvas(fig, 's00-impact-atmosfera.png')


def generate_impact_contraste():
    """07.4 Alto Contraste (Gomez Gonzalez et al. 2017): Sustracción de speckles con PCA/autoencoders."""
    fig, ax = create_blank_canvas()

    # Left: Raw frame with bright speckle halo
    c1x, c1y = 2.6, 2.5
    raw_box = FancyBboxPatch((1.0, 0.9), 3.2, 3.2, boxstyle="round,pad=0.08",
                            linewidth=2.5, edgecolor=MUTED, facecolor='none')
    ax.add_patch(raw_box)
    ax.plot(c1x, c1y, marker='*', markersize=24, color=AMBER)
    np.random.seed(99)
    for _ in range(30):
        r = np.random.uniform(0.3, 1.3)
        th = np.random.uniform(0, 2 * np.pi)
        ax.plot(c1x + r * np.cos(th), c1y + r * np.sin(th), '.', color=AMBER, markersize=6, alpha=0.5)

    # Subtraction minus operator
    ax.plot([4.6, 5.2], [2.5, 2.5], color=CYAN, linewidth=4.0)

    # Right: Cleaned reconstructed frame revealing companion
    c2x, c2y = 7.0, 2.5
    clean_box = FancyBboxPatch((5.4, 0.9), 3.2, 3.2, boxstyle="round,pad=0.08",
                              linewidth=2.5, edgecolor=EMERALD, facecolor='none')
    ax.add_patch(clean_box)
    # Residual blocked center
    ax.plot(c2x, c2y, marker='o', markersize=14, color='#090d16', markeredgecolor=MUTED, markeredgewidth=1.5)
    # Faint exoplanet companion clearly detected!
    ax.plot(c2x + 1.0, c2y + 0.6, marker='o', markersize=12, color=CYAN, markeredgecolor='#fef08a', markeredgewidth=2)
    circle_target = Circle((c2x + 1.0, c2y + 0.6), 0.35, fill=False, edgecolor=CYAN, linewidth=1.5, linestyle=':')
    ax.add_patch(circle_target)

    save_canvas(fig, 's00-impact-contraste.png')


def generate_impact_robovetter():
    """07.5 Robovetter (Coughlin et al. 2016): Árbol de decisiones y vetting estadístico."""
    fig, ax = create_blank_canvas()

    # Root decision node
    root = Circle((2.0, 2.5), 0.45, fill=False, edgecolor=TEAL, linewidth=2.5)
    ax.add_patch(root)

    # Intermediate test nodes
    n1 = Circle((4.5, 3.6), 0.45, fill=False, edgecolor=CYAN, linewidth=2.5)
    n2 = Circle((4.5, 1.4), 0.45, fill=False, edgecolor=CYAN, linewidth=2.5)
    ax.add_patch(n1)
    ax.add_patch(n2)

    # Connectors with yes/no branches
    ax.plot([2.45, 4.05], [2.7, 3.4], color=TEAL, linewidth=2.0)
    ax.plot([2.45, 4.05], [2.3, 1.6], color=TEAL, linewidth=2.0)

    # Terminal leaves
    # False positive leaf (coral red)
    fp = Circle((7.2, 4.0), 0.5, fill=True, color=RED)
    ax.add_patch(fp)
    ax.plot([4.95, 6.7], [3.7, 3.95], color=CYAN, linewidth=2.0)

    # Confirmed candidate leaf (emerald green)
    cand = Circle((7.2, 2.5), 0.5, fill=True, color=EMERALD)
    ax.add_patch(cand)
    ax.plot([4.95, 6.7], [3.45, 2.6], color=CYAN, linewidth=2.0)

    # Secondary test leaf (amber)
    fp2 = Circle((7.2, 1.0), 0.5, fill=True, color=AMBER)
    ax.add_patch(fp2)
    ax.plot([4.95, 6.7], [1.3, 1.05], color=CYAN, linewidth=2.0)

    # Checkmark inside confirmed candidate
    ax.plot([6.95, 7.15, 7.45], [2.5, 2.35, 2.7], color='#fef08a', linewidth=3.0, solid_capstyle='round')

    save_canvas(fig, 's00-impact-robovetter.png')


def generate_impact_tess():
    """07.6 Exo-TESS (Yu et al. 2019): Sensor array 2x2 TESS y clasificación homogénea."""
    fig, ax = create_blank_canvas()

    # 2x2 TESS camera detector array
    for (gx, gy) in [(1.6, 2.7), (2.9, 2.7), (1.6, 1.4), (2.9, 1.4)]:
        cam = FancyBboxPatch((gx, gy), 1.0, 1.0, boxstyle="round,pad=0.04",
                             linewidth=2.0, edgecolor=CYAN, facecolor='none')
        ax.add_patch(cam)
        # Pixel grid lines
        ax.plot([gx + 0.33, gx + 0.33], [gy, gy + 1.0], color=MUTED, linewidth=1.0, linestyle=':')
        ax.plot([gx + 0.66, gx + 0.66], [gy, gy + 1.0], color=MUTED, linewidth=1.0, linestyle=':')

    # Arrow to network
    ax.plot([4.3, 5.2], [2.5, 2.5], color=TEAL, linewidth=3.0)

    # Deep neural network stacked layers
    for lx in [5.6, 6.4, 7.2]:
        ax.plot([lx, lx], [1.2, 3.8], color=INDIGO, linewidth=4.0, solid_capstyle='round')
    # Layer interconnections
    for y1 in [1.6, 2.5, 3.4]:
        for y2 in [1.6, 2.5, 3.4]:
            ax.plot([5.6, 6.4], [y1, y2], color=INDIGO, linewidth=1.0, alpha=0.4)
            ax.plot([6.4, 7.2], [y1, y2], color=INDIGO, linewidth=1.0, alpha=0.4)

    # 100% Homogeneous classification badge on right
    out_badge = Circle((8.5, 2.5), 0.7, fill=False, edgecolor=EMERALD, linewidth=3.0)
    ax.add_patch(out_badge)
    ax.plot([8.15, 8.45, 8.85], [2.45, 2.25, 2.8], color=EMERALD, linewidth=3.5, solid_capstyle='round')

    save_canvas(fig, 's00-impact-tess.png')


def main():
    print("Generating S00 miniatures...")
    # Station 02: Planetary Pillars
    generate_pillar_origen()
    generate_pillar_estructura()
    generate_pillar_evolucion()
    generate_pillar_habitabilidad()

    # Station 04: Measurement Modalities
    generate_medicion_transito()
    generate_medicion_radial()
    generate_medicion_espectro()
    generate_medicion_imagen()

    # Station 05: Data Lifecycle
    generate_datos_observacion()
    generate_datos_catalogo()
    generate_datos_simulacion()
    generate_datos_entrenamiento()
    generate_datos_salida()

    # Station 06: ML Verbs
    generate_verb_detectar()
    generate_verb_clasificar()
    generate_verb_estimar()
    generate_verb_describir()
    generate_verb_priorizar()

    # Station 07: Literature Impact Cases
    generate_impact_astronet()
    generate_impact_estabilidad()
    generate_impact_atmosfera()
    generate_impact_contraste()
    generate_impact_robovetter()
    generate_impact_tess()

    # Station 08: Branches
    generate_branch_astronomia()
    generate_branch_teoria()
    generate_branch_aplicacion()

    print("All 27 S00 miniatures generated successfully!")


if __name__ == '__main__':
    main()

