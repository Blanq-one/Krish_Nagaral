import os

# Output to the portfolio's own public folder
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")

# (filename, [title lines], category label)
projects = [
    ("offline_gpt.svg", ["Offline ChatGPT", "Local LLM Chat"], "AI / ML"),
    ("captioncraft.svg", ["CaptionCraft AI", "Image Captioning"], "Computer Vision"),
]

TEMPLATE = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" role="img" aria-label="{aria}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="55%" stop-color="#121212"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="55%">
      <stop offset="0%" stop-color="#1db954" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#1db954" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#1db954" stop-opacity="0"/>
    </radialGradient>
    <pattern id="neural" x="0" y="0" width="110" height="110" patternUnits="userSpaceOnUse">
      <circle cx="55" cy="55" r="1.6" fill="#1db954" opacity="0.5"/>
      <circle cx="10" cy="10" r="1.1" fill="#1db954" opacity="0.35"/>
      <circle cx="100" cy="10" r="1.1" fill="#1db954" opacity="0.35"/>
      <circle cx="10" cy="100" r="1.1" fill="#1db954" opacity="0.35"/>
      <circle cx="100" cy="100" r="1.1" fill="#1db954" opacity="0.35"/>
      <line x1="55" y1="55" x2="10" y2="10" stroke="#1db954" stroke-width="0.4" opacity="0.22"/>
      <line x1="55" y1="55" x2="100" y2="10" stroke="#1db954" stroke-width="0.4" opacity="0.22"/>
      <line x1="55" y1="55" x2="10" y2="100" stroke="#1db954" stroke-width="0.4" opacity="0.22"/>
      <line x1="55" y1="55" x2="100" y2="100" stroke="#1db954" stroke-width="0.4" opacity="0.22"/>
    </pattern>
  </defs>

  <rect width="800" height="450" fill="url(#bg)"/>
  <rect width="800" height="450" fill="url(#neural)" opacity="0.5"/>
  <rect width="800" height="450" fill="url(#glow)"/>

  <!-- category pill -->
  <g transform="translate(56, 70)">
    <rect x="0" y="0" rx="16" ry="16" width="{pill_w}" height="32" fill="#1db954" fill-opacity="0.14" stroke="#1db954" stroke-opacity="0.55" stroke-width="1"/>
    <circle cx="20" cy="16" r="4" fill="#1db954"/>
    <text x="34" y="21" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="600" fill="#1ed760" letter-spacing="0.5">{category}</text>
  </g>

  <!-- title -->
  <text x="56" y="{t1y}" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">{line1}</text>
  {line2_el}

  <!-- accent underline -->
  <rect x="58" y="{uy}" width="84" height="5" rx="2.5" fill="#1db954"/>

  <text x="744" y="416" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600" fill="#ffffff" opacity="0.45">Krish Nagaral</text>
</svg>
'''

for fname, lines, category in projects:
    line1 = lines[0]
    has2 = len(lines) > 1
    pill_w = 48 + len(category) * 8
    if has2:
        t1y = 250
        line2_el = f'<text x="56" y="312" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="700" fill="#b3b3b3" letter-spacing="-0.5">{lines[1]}</text>'
        uy = 340
    else:
        t1y = 270
        line2_el = ""
        uy = 300
    svg = TEMPLATE.format(
        aria=f"{line1} {lines[1] if has2 else ''} - {category}".strip(),
        category=category,
        pill_w=pill_w,
        line1=line1,
        line2_el=line2_el,
        t1y=t1y,
        uy=uy,
    )
    path = os.path.join(OUT, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", path)

print("done")
