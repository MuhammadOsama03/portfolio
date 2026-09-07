from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class AnchorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])


def main() -> None:
    required = ["index.html", "styles.css", "script.js", "404.html", "site.webmanifest"]
    missing = [name for name in required if not (ROOT / name).exists()]
    if missing:
        raise SystemExit(f"Missing required site files: {', '.join(missing)}")

    parser = AnchorParser()
    parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
    broken = sorted({href for href in parser.links if href.startswith("#") and href[1:] not in parser.ids})
    if broken:
        raise SystemExit(f"Broken internal anchors: {', '.join(broken)}")

    manifest = (ROOT / "site.webmanifest").read_text(encoding="utf-8").strip()
    if not manifest:
        raise SystemExit("site.webmanifest is empty")

    print(f"Site validation passed: {len(parser.ids)} anchors and {len(parser.links)} links checked.")


if __name__ == "__main__":
    main()
