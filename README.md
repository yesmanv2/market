# Market Pulse

Static market dashboard for scores, market breadth, key tickers, and commentary.

## Files

- `index.html`: app shell for hosted use
- `styles.css`: visual design
- `app.js`: interactions, scoring, chart rendering, ticker search
- `data/`: static dashboard data, ticker catalog, and selected quotes
- `market_pulse_dashboard_shareable.html`: self-contained HTML file for sharing

## Local Preview

Run from this folder:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The hosted app uses local static JSON files.
- The shareable HTML file is self-contained and can be opened directly.
- Prices and technical scores are static snapshots, not live trading data.
