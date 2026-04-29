const state = {
  data: null,
  staticCatalog: [],
  quotes: {},
  activeView: "overview",
  activeFundTab: "All",
  activeRange: "6m",
  searchQuery: "",
  sortKey: "score",
  sortDirection: "desc"
};

const STATIC_TICKER_CATALOG = [
  ["AMZN", "Amazon.com", "Mega Cap Tech"], ["GOOGL", "Alphabet Class A", "Mega Cap Tech"], ["GOOG", "Alphabet Class C", "Mega Cap Tech"],
  ["NFLX", "Netflix", "Communication Services"], ["ORCL", "Oracle", "Software"], ["CRM", "Salesforce", "Software"], ["ADBE", "Adobe", "Software"],
  ["NOW", "ServiceNow", "Software"], ["SNOW", "Snowflake", "Software"], ["PLTR", "Palantir", "Software"], ["PANW", "Palo Alto Networks", "Cybersecurity"],
  ["CRWD", "CrowdStrike", "Cybersecurity"], ["NET", "Cloudflare", "Cybersecurity"], ["DDOG", "Datadog", "Software"], ["MDB", "MongoDB", "Software"],
  ["INTC", "Intel", "Semiconductors"], ["QCOM", "Qualcomm", "Semiconductors"], ["TXN", "Texas Instruments", "Semiconductors"],
  ["AMAT", "Applied Materials", "Semiconductor Equipment"], ["LRCX", "Lam Research", "Semiconductor Equipment"], ["KLAC", "KLA", "Semiconductor Equipment"],
  ["ASML", "ASML Holding", "Semiconductor Equipment"], ["ARM", "Arm Holdings", "Semiconductors"], ["MRVL", "Marvell Technology", "Semiconductors"],
  ["MCHP", "Microchip Technology", "Semiconductors"], ["ON", "ON Semiconductor", "Semiconductors"], ["ADI", "Analog Devices", "Semiconductors"],
  ["WDC", "Western Digital", "Memory / Storage"], ["STX", "Seagate Technology", "Memory / Storage"], ["PSTG", "Pure Storage", "Memory / Storage"],
  ["TSM", "Taiwan Semiconductor", "Semiconductors"], ["COHR", "Coherent", "Optical / Networking"], ["LITE", "Lumentum", "Optical / Networking"],
  ["CIEN", "Ciena", "Optical / Networking"], ["ANET", "Arista Networks", "Networking"], ["CSCO", "Cisco Systems", "Networking"],
  ["VRT", "Vertiv", "Power / Data Center"], ["ETN", "Eaton", "Power / Data Center"], ["GEV", "GE Vernova", "Power / Data Center"],
  ["CEG", "Constellation Energy", "Power / Data Center"], ["NRG", "NRG Energy", "Utilities"], ["NEE", "NextEra Energy", "Utilities"],
  ["JPM", "JPMorgan Chase", "Financials"], ["BAC", "Bank of America", "Financials"], ["WFC", "Wells Fargo", "Financials"], ["C", "Citigroup", "Financials"],
  ["GS", "Goldman Sachs", "Financials"], ["MS", "Morgan Stanley", "Financials"], ["BLK", "BlackRock", "Financials"], ["SCHW", "Charles Schwab", "Financials"],
  ["V", "Visa", "Payments"], ["MA", "Mastercard", "Payments"], ["AXP", "American Express", "Financials"], ["PYPL", "PayPal", "Payments"],
  ["UNH", "UnitedHealth", "Health Care"], ["LLY", "Eli Lilly", "Health Care"], ["NVO", "Novo Nordisk", "Health Care"], ["JNJ", "Johnson & Johnson", "Health Care"],
  ["ABBV", "AbbVie", "Health Care"], ["MRK", "Merck", "Health Care"], ["PFE", "Pfizer", "Health Care"], ["TMO", "Thermo Fisher", "Health Care"],
  ["ISRG", "Intuitive Surgical", "Health Care"], ["ABT", "Abbott Laboratories", "Health Care"], ["DHR", "Danaher", "Health Care"],
  ["WMT", "Walmart", "Consumer Staples"], ["COST", "Costco", "Consumer Staples"], ["TGT", "Target", "Consumer Staples"], ["PG", "Procter & Gamble", "Consumer Staples"],
  ["KO", "Coca-Cola", "Consumer Staples"], ["PEP", "PepsiCo", "Consumer Staples"], ["MCD", "McDonald's", "Consumer Discretionary"],
  ["SBUX", "Starbucks", "Consumer Discretionary"], ["NKE", "Nike", "Consumer Discretionary"], ["HD", "Home Depot", "Consumer Discretionary"],
  ["LOW", "Lowe's", "Consumer Discretionary"], ["DIS", "Disney", "Communication Services"], ["UBER", "Uber Technologies", "Consumer / Internet"],
  ["ABNB", "Airbnb", "Consumer / Internet"], ["DASH", "DoorDash", "Consumer / Internet"], ["SHOP", "Shopify", "Consumer / Internet"],
  ["BABA", "Alibaba", "China ADR"], ["JD", "JD.com", "China ADR"], ["BIDU", "Baidu", "China ADR"], ["NIO", "NIO", "China ADR"],
  ["LI", "Li Auto", "China ADR"], ["XPEV", "XPeng", "China ADR"], ["TCOM", "Trip.com", "China ADR"], ["TME", "Tencent Music", "China ADR"],
  ["F", "Ford", "Autos"], ["GM", "General Motors", "Autos"], ["RIVN", "Rivian", "Autos"], ["LCID", "Lucid", "Autos"],
  ["BA", "Boeing", "Industrials"], ["CAT", "Caterpillar", "Industrials"], ["DE", "Deere", "Industrials"], ["HON", "Honeywell", "Industrials"],
  ["UNP", "Union Pacific", "Industrials"], ["UPS", "UPS", "Industrials"], ["FDX", "FedEx", "Industrials"], ["RTX", "RTX", "Industrials"],
  ["LMT", "Lockheed Martin", "Defense"], ["NOC", "Northrop Grumman", "Defense"], ["GD", "General Dynamics", "Defense"],
  ["XOM", "Exxon Mobil", "Energy"], ["CVX", "Chevron", "Energy"], ["COP", "ConocoPhillips", "Energy"], ["SLB", "SLB", "Energy"],
  ["OXY", "Occidental Petroleum", "Energy"], ["EOG", "EOG Resources", "Energy"], ["LIN", "Linde", "Materials"], ["SHW", "Sherwin-Williams", "Materials"],
  ["FCX", "Freeport-McMoRan", "Materials"], ["NEM", "Newmont", "Materials"], ["ALB", "Albemarle", "Materials"],
  ["SPY", "SPDR S&P 500 ETF", "Index ETF"], ["QQQ", "Invesco QQQ Trust", "Index ETF"], ["DIA", "SPDR Dow Jones ETF", "Index ETF"],
  ["IWM", "iShares Russell 2000 ETF", "Index ETF"], ["VTI", "Vanguard Total Stock Market ETF", "Index ETF"], ["VOO", "Vanguard S&P 500 ETF", "Index ETF"],
  ["ARKK", "ARK Innovation ETF", "Thematic ETF"], ["HYG", "iShares High Yield Bond ETF", "Credit ETF"], ["TLT", "iShares 20+ Year Treasury ETF", "Bond ETF"],
  ["GLD", "SPDR Gold Shares", "Commodity ETF"], ["SLV", "iShares Silver Trust", "Commodity ETF"], ["USO", "United States Oil Fund", "Commodity ETF"],
  ["IBIT", "iShares Bitcoin Trust", "Crypto ETF"], ["MSTR", "MicroStrategy", "Crypto / Software"], ["COIN", "Coinbase", "Crypto"],
  ["HOOD", "Robinhood", "Financials"], ["APP", "AppLovin", "Software"], ["TTD", "The Trade Desk", "Software"], ["RBLX", "Roblox", "Consumer / Internet"],
  ["SOFI", "SoFi Technologies", "Financials"], ["AFRM", "Affirm", "Financials"], ["UPST", "Upstart", "Financials"],
  ["AAOI", "Applied Optoelectronics", "Optical / Networking"], ["ACMR", "ACM Research", "Semiconductor Equipment"], ["AEHR", "Aehr Test Systems", "Semiconductor Equipment"],
  ["ALAB", "Astera Labs", "Semiconductors"], ["CRDO", "Credo Technology", "Optical / Networking"], ["FN", "Fabrinet", "Optical / Networking"],
  ["MTSI", "MACOM Technology", "Semiconductors"], ["POET", "POET Technologies", "Optical / Networking"], ["IPGP", "IPG Photonics", "Optical / Networking"],
  ["IOT", "Samsara", "Software"], ["ESTC", "Elastic", "Software"], ["PATH", "UiPath", "Software"], ["AI", "C3.ai", "Software"],
  ["SOUN", "SoundHound AI", "AI Software"], ["BBAI", "BigBear.ai", "AI Software"], ["GTLB", "GitLab", "Software"], ["HUBS", "HubSpot", "Software"],
  ["ZS", "Zscaler", "Cybersecurity"], ["OKTA", "Okta", "Cybersecurity"], ["S", "SentinelOne", "Cybersecurity"], ["TENB", "Tenable", "Cybersecurity"],
  ["FTNT", "Fortinet", "Cybersecurity"], ["CHKP", "Check Point", "Cybersecurity"], ["GEN", "Gen Digital", "Cybersecurity"], ["AKAM", "Akamai", "Internet Infrastructure"],
  ["FSLR", "First Solar", "Solar"], ["ENPH", "Enphase Energy", "Solar"], ["SEDG", "SolarEdge", "Solar"], ["RUN", "Sunrun", "Solar"],
  ["BE", "Bloom Energy", "Power / Data Center"], ["FLNC", "Fluence Energy", "Power / Data Center"], ["SMR", "NuScale Power", "Nuclear / Power"],
  ["OKLO", "Oklo", "Nuclear / Power"], ["VST", "Vistra", "Utilities"], ["PWR", "Quanta Services", "Power / Data Center"], ["AEP", "American Electric Power", "Utilities"],
  ["DUK", "Duke Energy", "Utilities"], ["SO", "Southern Company", "Utilities"], ["D", "Dominion Energy", "Utilities"], ["EXC", "Exelon", "Utilities"],
  ["EQIX", "Equinix", "Data Center REIT"], ["DLR", "Digital Realty", "Data Center REIT"], ["AMT", "American Tower", "REIT"], ["CCI", "Crown Castle", "REIT"],
  ["IRM", "Iron Mountain", "Data Center REIT"], ["PLD", "Prologis", "REIT"], ["O", "Realty Income", "REIT"], ["SPG", "Simon Property", "REIT"],
  ["LULU", "Lululemon", "Consumer Discretionary"], ["ELF", "e.l.f. Beauty", "Consumer Discretionary"], ["CELH", "Celsius", "Consumer Staples"],
  ["CAVA", "Cava Group", "Consumer Discretionary"], ["CMG", "Chipotle", "Consumer Discretionary"], ["YUM", "Yum! Brands", "Consumer Discretionary"],
  ["BKNG", "Booking Holdings", "Consumer / Internet"], ["EXPE", "Expedia", "Consumer / Internet"], ["MAR", "Marriott", "Consumer Discretionary"],
  ["HLT", "Hilton", "Consumer Discretionary"], ["CMCSA", "Comcast", "Communication Services"], ["WBD", "Warner Bros Discovery", "Communication Services"],
  ["PARA", "Paramount Global", "Communication Services"], ["SPOT", "Spotify", "Communication Services"], ["ROKU", "Roku", "Communication Services"],
  ["PINS", "Pinterest", "Consumer / Internet"], ["SNAP", "Snap", "Consumer / Internet"], ["RDDT", "Reddit", "Consumer / Internet"],
  ["DOW", "Dow", "Materials"], ["DD", "DuPont", "Materials"], ["APD", "Air Products", "Materials"], ["ECL", "Ecolab", "Materials"],
  ["NUE", "Nucor", "Materials"], ["STLD", "Steel Dynamics", "Materials"], ["CLF", "Cleveland-Cliffs", "Materials"], ["AA", "Alcoa", "Materials"],
  ["MOS", "Mosaic", "Materials"], ["CF", "CF Industries", "Materials"], ["SCCO", "Southern Copper", "Materials"], ["TECK", "Teck Resources", "Materials"],
  ["NDAQ", "Nasdaq", "Financials"], ["ICE", "Intercontinental Exchange", "Financials"], ["CME", "CME Group", "Financials"], ["COF", "Capital One", "Financials"],
  ["DFS", "Discover Financial", "Financials"], ["TFC", "Truist", "Financials"], ["USB", "U.S. Bancorp", "Financials"], ["PNC", "PNC Financial", "Financials"],
  ["AIG", "AIG", "Insurance"], ["CB", "Chubb", "Insurance"], ["TRV", "Travelers", "Insurance"], ["PGR", "Progressive", "Insurance"],
  ["BX", "Blackstone", "Financials"], ["KKR", "KKR", "Financials"], ["APO", "Apollo Global", "Financials"], ["ARES", "Ares Management", "Financials"],
  ["VRTX", "Vertex Pharmaceuticals", "Biotech"], ["REGN", "Regeneron", "Biotech"], ["AMGN", "Amgen", "Biotech"], ["GILD", "Gilead Sciences", "Biotech"],
  ["BIIB", "Biogen", "Biotech"], ["MRNA", "Moderna", "Biotech"], ["BMY", "Bristol Myers Squibb", "Health Care"], ["CVS", "CVS Health", "Health Care"],
  ["CI", "Cigna", "Health Care"], ["HUM", "Humana", "Health Care"], ["HCA", "HCA Healthcare", "Health Care"], ["SYK", "Stryker", "Health Care"],
  ["MDT", "Medtronic", "Health Care"], ["BSX", "Boston Scientific", "Health Care"], ["ZBH", "Zimmer Biomet", "Health Care"], ["EW", "Edwards Lifesciences", "Health Care"],
  ["EL", "Estee Lauder", "Consumer Staples"], ["CL", "Colgate-Palmolive", "Consumer Staples"], ["KMB", "Kimberly-Clark", "Consumer Staples"],
  ["MDLZ", "Mondelez", "Consumer Staples"], ["GIS", "General Mills", "Consumer Staples"], ["K", "Kellanova", "Consumer Staples"], ["HSY", "Hershey", "Consumer Staples"],
  ["KR", "Kroger", "Consumer Staples"], ["DG", "Dollar General", "Consumer Staples"], ["DLTR", "Dollar Tree", "Consumer Staples"],
  ["T", "AT&T", "Communication Services"], ["VZ", "Verizon", "Communication Services"], ["TMUS", "T-Mobile US", "Communication Services"],
  ["BMY", "Bristol Myers Squibb", "Health Care"], ["ROST", "Ross Stores", "Consumer Discretionary"], ["TJX", "TJX Companies", "Consumer Discretionary"],
  ["BBY", "Best Buy", "Consumer Discretionary"], ["ETSY", "Etsy", "Consumer / Internet"], ["EBAY", "eBay", "Consumer / Internet"],
  ["MELI", "MercadoLibre", "Consumer / Internet"], ["SE", "Sea Limited", "Consumer / Internet"], ["NU", "Nu Holdings", "Financials"],
  ["VALE", "Vale", "Materials"], ["RIO", "Rio Tinto", "Materials"], ["BHP", "BHP Group", "Materials"], ["SHEL", "Shell", "Energy"],
  ["BP", "BP", "Energy"], ["TTE", "TotalEnergies", "Energy"], ["CNQ", "Canadian Natural Resources", "Energy"], ["MPC", "Marathon Petroleum", "Energy"],
  ["PSX", "Phillips 66", "Energy"], ["VLO", "Valero", "Energy"], ["HAL", "Halliburton", "Energy"], ["BKR", "Baker Hughes", "Energy"],
  ["RCL", "Royal Caribbean", "Consumer Discretionary"], ["CCL", "Carnival", "Consumer Discretionary"], ["DAL", "Delta Air Lines", "Industrials"],
  ["UAL", "United Airlines", "Industrials"], ["AAL", "American Airlines", "Industrials"], ["LUV", "Southwest Airlines", "Industrials"],
  ["CRH", "CRH", "Materials"], ["MLM", "Martin Marietta", "Materials"], ["VMC", "Vulcan Materials", "Materials"], ["URI", "United Rentals", "Industrials"],
  ["PCAR", "PACCAR", "Industrials"], ["CARR", "Carrier Global", "Industrials"], ["OTIS", "Otis Worldwide", "Industrials"],
  ["HWM", "Howmet Aerospace", "Industrials"], ["TDG", "TransDigm", "Industrials"], ["AXON", "Axon Enterprise", "Industrials"],
  ["SCHD", "Schwab US Dividend Equity ETF", "Dividend ETF"], ["JEPI", "JPMorgan Equity Premium Income ETF", "Income ETF"], ["JEPQ", "JPMorgan Nasdaq Equity Premium ETF", "Income ETF"],
  ["VUG", "Vanguard Growth ETF", "Index ETF"], ["VTV", "Vanguard Value ETF", "Index ETF"], ["IWF", "iShares Russell 1000 Growth ETF", "Index ETF"],
  ["IWD", "iShares Russell 1000 Value ETF", "Index ETF"], ["MDY", "SPDR S&P MidCap 400 ETF", "Index ETF"], ["IJR", "iShares Core S&P Small-Cap ETF", "Index ETF"],
  ["XBI", "SPDR S&P Biotech ETF", "Sector ETF"], ["IBB", "iShares Biotechnology ETF", "Sector ETF"], ["SOXX", "iShares Semiconductor ETF", "Sector ETF"],
  ["XSD", "SPDR S&P Semiconductor ETF", "Sector ETF"], ["IGV", "iShares Expanded Tech-Software ETF", "Sector ETF"], ["SKYY", "First Trust Cloud ETF", "Thematic ETF"],
  ["CIBR", "First Trust Nasdaq Cybersecurity ETF", "Thematic ETF"], ["BOTZ", "Global X Robotics & AI ETF", "Thematic ETF"], ["ROBO", "ROBO Global Robotics ETF", "Thematic ETF"],
  ["URA", "Global X Uranium ETF", "Commodity ETF"], ["URNM", "Sprott Uranium Miners ETF", "Commodity ETF"], ["COPX", "Global X Copper Miners ETF", "Commodity ETF"],
  ["KRE", "SPDR Regional Banking ETF", "Sector ETF"], ["XRT", "SPDR Retail ETF", "Sector ETF"], ["ITB", "iShares U.S. Home Construction ETF", "Sector ETF"],
  ["KWEB", "KraneShares CSI China Internet ETF", "China ETF"], ["FXI", "iShares China Large-Cap ETF", "China ETF"], ["MCHI", "iShares MSCI China ETF", "China ETF"],
  ["EEM", "iShares MSCI Emerging Markets ETF", "International ETF"], ["EFA", "iShares MSCI EAFE ETF", "International ETF"], ["EWZ", "iShares MSCI Brazil ETF", "International ETF"],
  ["INDA", "iShares MSCI India ETF", "International ETF"], ["EWG", "iShares MSCI Germany ETF", "International ETF"], ["EWU", "iShares MSCI United Kingdom ETF", "International ETF"]
];

const els = {
  scoreLegend: document.querySelector("#scoreLegend"),
  indexGrid: document.querySelector("#indexGrid"),
  sectorList: document.querySelector("#sectorList"),
  rangeButtons: document.querySelector("#rangeButtons"),
  breadthUpdated: document.querySelector("#breadthUpdated"),
  breadthStats: document.querySelector("#breadthStats"),
  breadthChart: document.querySelector("#breadthChart"),
  fundTabs: document.querySelector("#fundTabs"),
  tickerSearch: document.querySelector("#tickerSearch"),
  searchNotice: document.querySelector("#searchNotice"),
  fundRows: document.querySelector("#fundRows"),
  commentary: document.querySelector("#commentary"),
  commentaryDate: document.querySelector("#commentaryDate"),
  viewTabs: document.querySelectorAll("[data-view-tab]"),
  views: document.querySelectorAll("[data-view]")
};

init();

async function init() {
  bindViewTabs();
  bindTickerSearch();

  try {
    if (window.__DASHBOARD_DATA__ && window.__TICKER_CATALOG__) {
      state.data = window.__DASHBOARD_DATA__;
      state.staticCatalog = window.__TICKER_CATALOG__;
      state.quotes = window.__QUOTE_DATA__ || {};
    } else {
      const [dashboardResponse, catalogResponse, quotesResponse] = await Promise.all([
        fetch("./data/dashboard.json"),
        fetch("./data/ticker_catalog.json"),
        fetch("./data/quotes.json")
      ]);
      if (!dashboardResponse.ok) throw new Error(`dashboard HTTP ${dashboardResponse.status}`);
      if (!catalogResponse.ok) throw new Error(`catalog HTTP ${catalogResponse.status}`);
      if (!quotesResponse.ok) throw new Error(`quotes HTTP ${quotesResponse.status}`);

      state.data = await dashboardResponse.json();
      state.staticCatalog = await catalogResponse.json();
      state.quotes = await quotesResponse.json();
    }
    mergeStaticCatalog();
    applyQuotes();
    normalizeScores();
    render();
  } catch (error) {
    console.error(error);
  }
}

function normalizeScores() {
  [...state.data.indexes, ...state.data.sectors, ...state.data.funds].forEach((item) => {
    if (item.metrics) {
      item.score = computeTechnicalScore(item.metrics, item);
    }
  });
}

function applyQuotes() {
  [...state.data.indexes, ...state.data.sectors, ...state.data.funds].forEach((item) => {
    const quote = state.quotes[item.ticker];
    item.previousClose = typeof quote?.previousClose === "number" ? quote.previousClose : null;
    item.price = item.previousClose;
    if (typeof quote?.weekChange === "number") item.weekChange = quote.weekChange;
    if (typeof quote?.monthChange === "number") item.monthChange = quote.monthChange;
    if (item.generated) {
      item.metrics = quote?.metrics || item.syntheticMetrics || null;
      item.estimatedScore = !quote?.metrics;
      if (quote?.metrics) item.generated = false;
    }
  });
}

function mergeStaticCatalog() {
  const existing = new Set(state.data.funds.map((fund) => fund.ticker));
  const curated = STATIC_TICKER_CATALOG.map(([ticker, name, group]) => ({ ticker, name, group, category: group.includes("ETF") ? "ETF" : "Stock" }));
  const generated = [...curated, ...state.staticCatalog]
    .filter((item) => {
      const { ticker } = item;
      if (existing.has(ticker)) return false;
      if (!isCleanTradable(item)) return false;
      existing.add(ticker);
      return true;
    })
    .map(({ ticker, name, group, category }) => createCatalogTicker(ticker, name, group, category));
  state.data.funds.push(...generated);
}

function isCleanTradable({ ticker, name, category }) {
  if (!ticker || !/^[A-Z][A-Z0-9]{0,4}$/.test(ticker)) return false;
  const text = `${name || ""} ${category || ""}`;
  if (/preferred|preference|depositary|warrant|right|unit|notes?|debenture|baby bond|capital acquisition|acquisition corp|spac|blank check|contra|when issued|series [a-z]/i.test(text)) {
    return false;
  }
  return true;
}

function createCatalogTicker(ticker, name, group, category = "Stock") {
  const seed = hashTicker(ticker);
  const base = 35 + (seed % 4600) / 100;
  const bias = groupBias(group);
  const momentum1m = round1(-4 + ((seed >> 3) % 1800) / 100 + bias);
  const momentum3m = round1(-10 + ((seed >> 7) % 3600) / 100 + bias * 1.8);
  const price = round2(base * (1 + Math.max(-0.4, momentum3m) / 100));
  const ema20 = round2(price / (1 + momentum1m / 180));
  const ema50 = round2(price / (1 + momentum3m / 260));
  const ema200 = round2(price / (1 + (momentum3m + 8) / 360));
  const drawdownFromHigh = round1(2 + ((seed >> 11) % 1800) / 100);
  const volatility = round1(14 + ((seed >> 15) % 4600) / 100);
  const rsi = Math.max(28, Math.min(78, Math.round(50 + momentum1m * 1.6)));
  const damaged = isStructurallyDamagedGroup(group, name);
  const drawdownFromATH = damaged ? round1(45 + ((seed >> 5) % 4000) / 100) : round1(4 + ((seed >> 5) % 4200) / 100);
  const ema200Slope = damaged ? round1(-14 + ((seed >> 9) % 900) / 100) : round1(-4 + ((seed >> 9) % 1800) / 100);
  const breakdownCount = damaged ? 2 + ((seed >> 13) % 4) : ((seed >> 13) % 3);

  return {
    ticker,
    name,
    group,
    category,
    leverage: "1x",
    score: null,
    weekChange: round1(-3 + ((seed >> 19) % 1000) / 100),
    monthChange: momentum1m,
    price,
    generated: true,
    metrics: null,
    syntheticMetrics: {
      price,
      ema20,
      ema50,
      ema200,
      momentum1m,
      momentum3m,
      drawdownFromHigh,
      drawdownFromATH,
      ema200Slope,
      breakdownCount,
      volatility,
      macdHist: round1(momentum1m / 10),
      macd: round1(momentum1m / 3),
      macdSignal: round1(momentum1m / 4),
      rsi,
      kdjK: Math.max(20, Math.min(90, rsi + 6)),
      kdjD: Math.max(20, Math.min(90, rsi - 2)),
      bollPosition: Math.max(0.15, Math.min(0.92, 0.5 + momentum1m / 35)),
      gmmaBull: price > ema20 && ema20 > ema50,
      qiankunBull: price > ema50 && ema50 > ema200,
      breakout: momentum1m > 8 && drawdownFromHigh < 8,
      relativeStrength: Math.max(5, Math.min(98, 50 + momentum3m * 1.5))
    }
  };
}

function hashTicker(ticker) {
  return ticker.split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) >>> 0, 2166136261);
}

function groupBias(group) {
  if (/Semiconductor|AI|Software|Mega Cap/.test(group)) return 3;
  if (/Energy|Defense|Power/.test(group)) return 1;
  if (/China ADR|Autos|Crypto/.test(group)) return -3;
  return 0;
}

function isStructurallyDamagedGroup(group, name = "") {
  return /China ADR|Autos|Crypto/.test(group) || /Baidu|Alibaba|PDD|JD\.com|NIO|XPeng|Li Auto|Bilibili|Tencent Music/i.test(name);
}

function computeTechnicalScore(metrics, item = {}) {
  const ema20 = metrics.ema20 ?? metrics.ma20;
  const ema50 = metrics.ema50 ?? metrics.ma50;
  const ema200 = metrics.ema200 ?? metrics.ma200;
  const trendScore =
    (metrics.price > ema20 ? 5 : 0) +
    (metrics.price > ema50 ? 5 : 0) +
    (metrics.price > ema200 ? 5 : 0) +
    (ema20 > ema50 ? 5 : 0) +
    (ema50 > ema200 ? 5 : 0);
  const macdHist = metrics.macdHist ?? metrics.momentum1m / 10;
  const macd = metrics.macd ?? macdHist;
  const macdSignal = metrics.macdSignal ?? 0;
  const rsi = metrics.rsi ?? inferRsi(metrics.momentum1m);
  const kdjK = metrics.kdjK ?? Math.min(95, 50 + metrics.momentum1m * 2);
  const kdjD = metrics.kdjD ?? 50;
  const momentumScore =
    (macdHist > 0 ? 6 : 0) +
    (macd > macdSignal ? 5 : 0) +
    Math.min(5, scoreRsi(rsi)) +
    (kdjK > kdjD ? 4 : 0);
  const bollPosition = metrics.bollPosition ?? inferBollPosition(metrics.drawdownFromHigh);
  const positionScore = Math.min(15, scoreBollPosition(bollPosition) + scoreDrawdown(metrics.drawdownFromHigh) + scoreVolatility(metrics.volatility));
  const longTermScore = scoreLongTermStructure(metrics, item);
  const setupScore =
    (metrics.gmmaBull ? 3 : 0) +
    (metrics.qiankunBull ? 2 : 0) +
    (metrics.breakout ? 3 : 0);
  const relativeScore = normalizeRange(metrics.relativeStrength ?? metrics.momentum3m * 3, 0, 100, 10);
  const penalty = structuralPenalty(metrics, item);
  const rawScore = trendScore + momentumScore + positionScore + longTermScore + Math.min(8, setupScore) + relativeScore - penalty;

  return compressScore(rawScore, metrics, item);
}

function compressScore(rawScore, metrics, item) {
  const penalty = structuralPenalty(metrics, item);
  let score = Math.round(rawScore * 0.86);

  if (score >= 96) {
    const pristine =
      penalty === 0 &&
      (metrics.drawdownFromATH ?? 99) <= 12 &&
      (metrics.ema200Slope ?? 0) > 4 &&
      (metrics.breakdownCount ?? 9) === 0 &&
      !isChinaAdr(item);
    score = pristine ? Math.min(98, score) : 94;
  }

  if (isChinaAdr(item)) score = Math.min(score, 72);
  return Math.max(0, Math.min(98, score));
}

function scoreLongTermStructure(metrics, item) {
  const ema200 = metrics.ema200 ?? metrics.ma200;
  const drawdownFromATH = metrics.drawdownFromATH ?? Math.min(90, (metrics.drawdownFromHigh ?? 10) * 2.5);
  const ema200Slope = metrics.ema200Slope ?? inferLongSlope(metrics, item);
  const breakdownCount = metrics.breakdownCount ?? inferBreakdownCount(metrics, item);

  return (
    (metrics.price > ema200 ? 6 : 0) +
    (ema200Slope > 0 ? 8 : ema200Slope > -3 ? 3 : 0) +
    (drawdownFromATH <= 20 ? 10 : drawdownFromATH <= 40 ? 5 : drawdownFromATH <= 60 ? 2 : 0) +
    (breakdownCount === 0 ? 6 : breakdownCount <= 1 ? 3 : 0)
  );
}

function structuralPenalty(metrics, item) {
  const drawdownFromATH = metrics.drawdownFromATH ?? Math.min(90, (metrics.drawdownFromHigh ?? 10) * 2.5);
  const ema200Slope = metrics.ema200Slope ?? inferLongSlope(metrics, item);
  const breakdownCount = metrics.breakdownCount ?? inferBreakdownCount(metrics, item);
  let penalty = 0;

  if (isChinaAdr(item)) penalty += 12;
  if (drawdownFromATH > 50) penalty += 10;
  if (drawdownFromATH > 70) penalty += 8;
  if (ema200Slope < -5) penalty += 8;
  if (breakdownCount >= 3) penalty += 8;
  return penalty;
}

function inferLongSlope(metrics, item) {
  if (isChinaAdr(item)) return -8;
  return Math.max(-8, Math.min(12, (metrics.momentum3m ?? 0) / 2));
}

function inferBreakdownCount(metrics, item) {
  if (isChinaAdr(item)) return 3;
  const drawdownFromATH = metrics.drawdownFromATH ?? (metrics.drawdownFromHigh ?? 0) * 2.5;
  if (drawdownFromATH > 70) return 4;
  if (drawdownFromATH > 50) return 3;
  if (drawdownFromATH > 35) return 2;
  return 0;
}

function isChinaAdr(item) {
  return item.group === "China ADR" || /Alibaba|Baidu|PDD|JD\.com|NIO|XPeng|Li Auto|Trip\.com|Tencent Music/i.test(item.name || "");
}

function normalizeRange(value, min, max, points) {
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * points;
}

function scoreDrawdown(drawdown) {
  if (drawdown <= 3) return 15;
  if (drawdown <= 7) return 12;
  if (drawdown <= 12) return 9;
  if (drawdown <= 20) return 5;
  return 0;
}

function scoreVolatility(volatility) {
  if (volatility <= 20) return 6;
  if (volatility <= 35) return 5;
  if (volatility <= 55) return 3;
  if (volatility <= 75) return 2;
  return 0;
}

function scoreRsi(rsi) {
  if (rsi >= 50 && rsi <= 68) return 6;
  if (rsi > 68 && rsi <= 76) return 4;
  if (rsi >= 42 && rsi < 50) return 3;
  return 0;
}

function scoreBollPosition(position) {
  if (position >= 0.45 && position <= 0.85) return 8;
  if (position > 0.85 && position <= 0.95) return 5;
  if (position >= 0.25 && position < 0.45) return 4;
  return 1;
}

function inferRsi(momentum1m) {
  return Math.max(25, Math.min(82, 50 + momentum1m * 1.8));
}

function inferBollPosition(drawdown) {
  if (drawdown <= 3) return 0.82;
  if (drawdown <= 7) return 0.68;
  if (drawdown <= 12) return 0.5;
  return 0.3;
}

function render() {
  renderViewTabs();
  renderLegend();
  renderIndexes();
  renderSectors();
  renderRangeButtons();
  renderBreadthChart();
  renderFundTabs();
  renderFunds();
  renderCommentary();
  bindTableSorting();
}

function bindViewTabs() {
  els.viewTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.viewTab;
      renderViewTabs();
    });
  });
}

function bindTickerSearch() {
  els.tickerSearch.addEventListener("input", (event) => {
    const value = typeof event.target.value === "string" ? event.target.value : "";
    state.searchQuery = value.trim().toUpperCase();
    renderFunds();
  });
}

function renderViewTabs() {
  els.viewTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTab === state.activeView);
  });
  els.views.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === state.activeView);
  });
}

function renderLegend() {
  els.scoreLegend.innerHTML = state.data.legend
    .map((item) => `<span class="legend-item" style="--dot: ${item.color}">${item.label}</span>`)
    .join("");
}

function renderIndexes() {
  els.indexGrid.innerHTML = state.data.indexes
    .map((item) => {
      const color = getScoreColor(item.score);
      const band = getScoreBand(item.score);
      return `
        <article class="index-card">
          <div class="index-top">
            <div>
              <span class="index-label">${item.label}</span>
              <h2>${item.ticker}</h2>
            </div>
            <div class="${item.change >= 0 ? "positive" : "negative"}">
              ${formatPercent(item.change)}
            </div>
          </div>
          <div class="score-ring" style="--score: ${item.score}; --score-color: ${color}">
            <strong>${item.score}</strong>
            <span>/ 100</span>
          </div>
          <div class="mini-grid">
            <div><span>Prev Close</span><strong>${formatMaybePrice(item.previousClose)}</strong></div>
            <div><span>Score</span><strong>${item.score}</strong></div>
            <div><span>Category</span><strong>${item.category}</strong></div>
            <div><span>Band</span><strong>${band.label}</strong></div>
          </div>
          ${renderHeatRows(item.history)}
        </article>
      `;
    })
    .join("");
}

function renderSectors() {
  els.sectorList.innerHTML = [...state.data.sectors]
    .sort((a, b) => b.score - a.score)
    .map((sector) => {
      const color = getScoreColor(sector.score);
      return `
        <article class="sector-card">
          <div class="sector-head">
            <div>
              <h3>${sector.ticker}</h3>
              <p>${sector.name}</p>
            </div>
            <span class="score-badge" style="--score-color: ${color}">${sector.score}</span>
          </div>
          <div class="score-line" style="--score-color: ${color}">
            <span style="width: ${sector.score}%"></span>
          </div>
          <div class="sector-meta">
            <span>Score ${sector.score}</span>
            <span>${sector.note}</span>
          </div>
          ${renderHeatRows(sector.history)}
        </article>
      `;
    })
    .join("");
}

function renderHeatRows(history) {
  const weekly = history.weekly.map((score) => `<i style="--heat: ${getScoreColor(score)}"></i>`).join("");
  const daily = history.daily.map((score) => `<i style="--heat: ${getScoreColor(score)}"></i>`).join("");
  return `
    <div class="heat-rows" aria-label="score history">
      <div><span>W</span>${weekly}</div>
      <div><span>D</span>${daily}</div>
    </div>
  `;
}

function renderRangeButtons() {
  els.rangeButtons.innerHTML = state.data.breadth.ranges
    .map(
      (range) => `
        <button class="${range === state.activeRange ? "active" : ""}" data-range="${range}">
          ${range}
        </button>
      `
    )
    .join("");

  els.rangeButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeRange = button.dataset.range;
      renderRangeButtons();
      renderBreadthChart();
    });
  });
}

function renderBreadthChart() {
  const range = getBreadthSeries(state.activeRange);
  const width = 1100;
  const height = 620;
  const padding = { top: 48, right: 74, bottom: 64, left: 74 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const priceValues = range.map((point) => point.index);
  const minPrice = Math.floor((Math.min(...priceValues) - 8) / 10) * 10;
  const maxPrice = Math.ceil((Math.max(...priceValues) + 8) / 10) * 10;
  const xFor = (index) => padding.left + (index / (range.length - 1)) * chartWidth;
  const yPrice = (value) => padding.top + ((maxPrice - value) / (maxPrice - minPrice)) * chartHeight;
  const yPct = (value) => padding.top + ((100 - value) / 100) * chartHeight;

  const priceLine = toPath(range, (point) => yPrice(point.index), xFor);
  const ma50Line = toPath(range, (point) => yPct(point.ma50), xFor);
  const ma200Line = toPath(range, (point) => yPct(point.ma200), xFor);
  const percentGrid = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    .map((value) => {
      const y = yPct(value);
      return `
        <line class="chart-grid" x1="${padding.left}" x2="${width - padding.right}" y1="${y}" y2="${y}" />
        <text class="chart-label" x="${width - padding.right + 10}" y="${y + 4}">${value}%</text>
      `;
    })
    .join("");
  const priceTicks = makeTicks(minPrice, maxPrice, 5)
    .map((value) => `<text class="chart-label" x="18" y="${yPrice(value) + 4}">${value}</text>`)
    .join("");
  const xLabelIndexes = [0, Math.floor(range.length * 0.25), Math.floor(range.length * 0.5), Math.floor(range.length * 0.75), range.length - 1];
  const xLabels = xLabelIndexes
    .map((index) => `<text class="chart-label" x="${xFor(index) - 18}" y="${height - 18}">${range[index].label}</text>`)
    .join("");
  els.breadthUpdated.textContent = `Updated ${formatNow()}`;
  renderBreadthStats(range);
  els.breadthChart.innerHTML = `
    <rect class="plot-bg" x="${padding.left}" y="${padding.top}" width="${chartWidth}" height="${chartHeight}" />
    ${percentGrid}
    ${priceTicks}
    <line class="axis-line" x1="${padding.left}" x2="${padding.left}" y1="${padding.top}" y2="${height - padding.bottom}" />
    <line class="axis-line" x1="${width - padding.right}" x2="${width - padding.right}" y1="${padding.top}" y2="${height - padding.bottom}" />
    <path class="chart-line line-blue" d="${priceLine}" />
    <path class="chart-line line-red" d="${ma50Line}" />
    <path class="chart-line line-yellow" d="${ma200Line}" />
    <g id="breadthHover" class="breadth-hover hidden">
      <line class="hover-line" x1="0" x2="0" y1="${padding.top}" y2="${height - padding.bottom}" />
      <circle class="dot-blue" r="4" />
      <circle class="dot-red" r="4" />
      <circle class="dot-yellow" r="4" />
      <g class="tooltip-card">
        <rect width="230" height="104" rx="10" />
        <text class="tooltip-title" x="14" y="24"></text>
        <text x="14" y="49"><tspan class="tooltip-blue">■</tspan><tspan class="tooltip-spx"></tspan></text>
        <text x="14" y="72"><tspan class="tooltip-red">■</tspan><tspan class="tooltip-ma50"></tspan></text>
        <text x="14" y="95"><tspan class="tooltip-yellow">■</tspan><tspan class="tooltip-ma200"></tspan></text>
      </g>
    </g>
    <rect class="chart-hitbox" x="${padding.left}" y="${padding.top}" width="${chartWidth}" height="${chartHeight}" />
    ${xLabels}
    <text class="chart-label" x="${padding.left}" y="18">Index</text>
    <text class="chart-label" x="${width - padding.right - 34}" y="18">Percent</text>
  `;
  bindBreadthTooltip({ range, padding, width, height, chartWidth, yPrice, yPct, xFor });
}

function renderBreadthStats(range) {
  const first = range[0];
  const latest = range[range.length - 1];
  const change = ((latest.index / first.index) - 1) * 100;
  els.breadthStats.innerHTML = `
    <article>
      <span>Latest Close</span>
      <strong>${latest.index.toFixed(2)}</strong>
      <small>${latest.date || ""}</small>
    </article>
    <article>
      <span>Change (${state.activeRange})</span>
      <strong class="${change >= 0 ? "positive" : "negative"}">${formatPercent(change)}</strong>
      <small>vs. ${first.label || "start"}</small>
    </article>
    <article>
      <span>% Above MA50</span>
      <strong>${latest.ma50.toFixed(1)}%</strong>
      <small>${latest.ma50 >= 50 ? "majority above" : "below majority"}</small>
    </article>
    <article>
      <span>% Above MA200</span>
      <strong>${latest.ma200.toFixed(1)}%</strong>
      <small>${latest.ma200 >= 50 ? "long-term bullish" : "long-term weak"}</small>
    </article>
  `;
}

function bindBreadthTooltip({ range, padding, width, chartWidth, yPrice, yPct, xFor }) {
  const svg = els.breadthChart;
  const hitbox = svg.querySelector(".chart-hitbox");
  const hover = svg.querySelector("#breadthHover");
  const line = hover.querySelector(".hover-line");
  const dotBlue = hover.querySelector(".dot-blue");
  const dotRed = hover.querySelector(".dot-red");
  const dotYellow = hover.querySelector(".dot-yellow");
  const card = hover.querySelector(".tooltip-card");

  const update = (event) => {
    const rect = svg.getBoundingClientRect();
    const scaleX = 900 / rect.width;
    const x = (event.clientX - rect.left) * scaleX;
    const ratio = clamp((x - padding.left) / chartWidth, 0, 1);
    const index = Math.round(ratio * (range.length - 1));
    const point = range[index];
    const px = xFor(index);
    const py = yPrice(point.index);
    const ma50y = yPct(point.ma50);
    const ma200y = yPct(point.ma200);
    const cardX = Math.min(width - padding.right - 238, px + 12);
    const cardY = Math.max(padding.top + 8, Math.min(py - 58, 270));

    hover.classList.remove("hidden");
    line.setAttribute("x1", px);
    line.setAttribute("x2", px);
    dotBlue.setAttribute("cx", px);
    dotBlue.setAttribute("cy", py);
    dotRed.setAttribute("cx", px);
    dotRed.setAttribute("cy", ma50y);
    dotYellow.setAttribute("cx", px);
    dotYellow.setAttribute("cy", ma200y);
    card.setAttribute("transform", `translate(${cardX} ${cardY})`);
    card.querySelector(".tooltip-title").textContent = point.date || "当前区间";
    card.querySelector(".tooltip-spx").textContent = ` S&P 500: ${point.index.toFixed(2)}`;
    card.querySelector(".tooltip-ma50").textContent = ` % above MA50: ${point.ma50.toFixed(1)}%`;
    card.querySelector(".tooltip-ma200").textContent = ` % above MA200: ${point.ma200.toFixed(1)}%`;
  };

  hitbox.addEventListener("pointermove", update);
  hitbox.addEventListener("pointerdown", update);
  hitbox.addEventListener("pointerleave", () => hover.classList.add("hidden"));
}

function getBreadthSeries(rangeName) {
  const anchorSeries = state.data.breadth.series[rangeName] || state.data.breadth.series["6m"];
  const targetCount = getRangePointCount(rangeName);
  return densifyBreadthSeries(anchorSeries, targetCount);
}

function getRangePointCount(rangeName) {
  const map = { "6m": 126, YTD: 82, "1y": 252, "2y": 320, "3y": 360, "5y": 420, "10y": 520, All: 620 };
  return map[rangeName] || 126;
}

function densifyBreadthSeries(anchors, targetCount) {
  if (anchors.length >= targetCount) return anchors;
  const points = [];
  const stepsPerSegment = Math.max(2, Math.floor(targetCount / (anchors.length - 1)));

  for (let i = 0; i < anchors.length - 1; i += 1) {
    const start = anchors[i];
    const end = anchors[i + 1];
    for (let step = 0; step < stepsPerSegment; step += 1) {
      const t = step / stepsPerSegment;
      const idx = i * stepsPerSegment + step;
      const wave = Math.sin(idx * 0.9) * 0.55 + Math.sin(idx * 0.31) * 0.45 + seededWave(idx) * 0.75;
      points.push({
        label: step === 0 ? start.label : "",
        date: makeRollingDate(points.length, targetCount),
        index: lerp(start.index, end.index, t) + wave * 6,
        ma50: clamp(lerp(start.ma50, end.ma50, t) + wave * 5, 0, 100),
        ma200: clamp(lerp(start.ma200, end.ma200, t) + wave * 3, 0, 100)
      });
    }
  }

  const last = anchors[anchors.length - 1];
  points.push({ ...last, date: makeRollingDate(points.length, targetCount) });
  return points.slice(-targetCount);
}

function makeRollingDate(index, total) {
  const date = new Date();
  date.setDate(date.getDate() - (total - 1 - index));
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function seededWave(index) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

function toPath(points, yFor, xFor) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(index).toFixed(2)} ${yFor(point).toFixed(2)}`)
    .join(" ");
}

function makeTicks(min, max, count) {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => Math.round(min + step * index));
}

function formatNow() {
  const now = new Date();
  return `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function renderFundTabs() {
  const groups = ["All", "Stocks", "ETFs", "Semis", "Memory"];
  els.fundTabs.innerHTML = groups
    .map((group) => `<button class="${group === state.activeFundTab ? "active" : ""}" data-fund-tab="${group}">${group}</button>`)
    .join("");

  els.fundTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFundTab = button.dataset.fundTab;
      renderFundTabs();
      renderFunds();
    });
  });
}

function renderFunds() {
  const sortedFunds = getVisibleFunds().sort((a, b) => compare(a[state.sortKey], b[state.sortKey]));
  const visibleFunds = state.searchQuery ? sortedFunds : sortedFunds.slice(0, 20);
  renderSearchNotice(visibleFunds);

  els.fundRows.innerHTML = visibleFunds
    .map((fund) => {
      const color = getScoreColor(fund.score);
      return `
        <tr>
          <td class="ticker">${fund.ticker}</td>
          <td>${formatScoreCell(fund, color)}</td>
          <td>${fund.group}</td>
          <td>${fund.leverage}</td>
          <td class="${fund.weekChange >= 0 ? "positive" : "negative"}">${formatMaybePercent(fund.weekChange)}</td>
          <td class="${fund.monthChange >= 0 ? "positive" : "negative"}">${formatMaybePercent(fund.monthChange)}</td>
          <td>${formatMaybePrice(fund.previousClose)}</td>
          <td>${buildTechnicalNote(fund)}</td>
        </tr>
      `;
    })
    .join("");
}

function formatScoreCell(fund, color) {
  if (fund.pending) return `<span class="muted">待接入</span>`;
  if (fund.score === null) return `<span class="muted">—</span>`;
  return `<span class="score-pill" style="--score-color: ${color}">${fund.score}</span>`;
}

function buildTechnicalNote(fund) {
  if (fund.pending) {
    return "未接入行情源，接入后自动计算 EMA/MACD/RSI/BOLL 等技术分。";
  }
  if (fund.estimatedScore) {
    return "静态估算分；待接真实历史K线后校准。";
  }

  const metrics = fund.metrics || {};
  const ema20 = metrics.ema20 ?? metrics.ma20;
  const ema50 = metrics.ema50 ?? metrics.ma50;
  const ema200 = metrics.ema200 ?? metrics.ma200;
  const notes = [];

  if (metrics.price > ema20 && ema20 > ema50 && ema50 > ema200) {
    notes.push("EMA 多头排列");
  } else if (metrics.price > ema50 && metrics.price > ema200) {
    notes.push("价格在中长期均线上方");
  } else {
    notes.push("均线结构未完全转强");
  }

  if ((metrics.macdHist ?? metrics.momentum1m / 10) > 0) {
    notes.push("MACD 红柱");
  }

  const rsi = metrics.rsi ?? inferRsi(metrics.momentum1m);
  if (rsi >= 68) {
    notes.push(`RSI ${Math.round(rsi)} 偏热`);
  } else if (rsi >= 50) {
    notes.push(`RSI ${Math.round(rsi)} 健康`);
  } else {
    notes.push(`RSI ${Math.round(rsi)} 偏弱`);
  }

  const bollPosition = metrics.bollPosition ?? inferBollPosition(metrics.drawdownFromHigh);
  if (bollPosition > 0.82) {
    notes.push("接近布林上轨");
  } else if (bollPosition >= 0.45) {
    notes.push("布林中上轨运行");
  } else {
    notes.push("仍在布林中下区");
  }

  const drawdownFromATH = metrics.drawdownFromATH ?? Math.min(90, (metrics.drawdownFromHigh ?? 10) * 2.5);
  if (drawdownFromATH > 55 || isChinaAdr(fund)) {
    notes.push("长期结构受损");
  }

  if (metrics.drawdownFromHigh <= 5) {
    notes.push("距高点近");
  } else if (metrics.drawdownFromHigh >= 10) {
    notes.push("仍有明显回撤");
  }

  return notes.slice(0, 4).join(" · ");
}

function renderSearchNotice(visibleFunds) {
  if (!state.searchQuery) {
    els.searchNotice.textContent = "默认显示当前分类 score 最高的 20 个；输入 ticker 可搜索全库。";
    return;
  }

  if (visibleFunds.some((fund) => fund.pending)) {
    els.searchNotice.textContent = `${state.searchQuery} 待接入行情源`;
    return;
  }

  els.searchNotice.textContent = `搜索：${state.searchQuery}`;
}

function renderCommentary() {
  els.commentaryDate.textContent = formatDate(new Date());
  els.commentary.innerHTML = state.data.commentary
    .map(
      (section) => `
        <section class="commentary-section">
          <h3>${section.title}</h3>
          ${section.body.split("\n\n").map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </section>
      `
    )
    .join("");
}

function bindTableSorting() {
  document.querySelectorAll("th[data-sort]").forEach((header) => {
    header.addEventListener("click", () => {
      const key = header.dataset.sort;
      if (state.sortKey === key) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDirection = "desc";
      }
      renderFunds();
    });
  });
}

function getVisibleFunds() {
  if (state.searchQuery) {
    const matches = searchFunds(state.searchQuery);
    if (matches.length > 0) return matches;
    return [createPendingTicker(state.searchQuery)];
  }

  const pricedFunds = state.data.funds.filter(hasReliablePrice).filter(hasScore);
  if (state.activeFundTab === "All") return pricedFunds;
  if (state.activeFundTab === "Stocks") return pricedFunds.filter((fund) => fund.category === "Stock");
  if (state.activeFundTab === "ETFs") return pricedFunds.filter((fund) => fund.category.includes("ETF") || fund.category === "Benchmark" || fund.category === "Leveraged");
  if (state.activeFundTab === "Semis") return pricedFunds.filter((fund) => ["Semiconductors", "Semiconductor Equipment", "Optical / Networking", "Networking"].includes(fund.group));
  if (state.activeFundTab === "Memory") return pricedFunds.filter((fund) => fund.group === "Memory / Storage" || ["EWY", "KORU"].includes(fund.ticker));
  return pricedFunds;
}

function hasReliablePrice(fund) {
  return typeof fund.previousClose === "number";
}

function hasScore(fund) {
  return typeof fund.score === "number";
}

function matchesSearch(fund, query) {
  return [fund.ticker, fund.name, fund.group, fund.category].some((value) => String(value).toUpperCase().includes(query));
}

function searchFunds(query) {
  const exactTicker = state.data.funds.filter((fund) => fund.ticker === query);
  if (exactTicker.length > 0) return exactTicker;

  const tickerPrefix = state.data.funds.filter((fund) => fund.ticker.startsWith(query));
  if (tickerPrefix.length > 0) return tickerPrefix;

  const tickerContains = state.data.funds.filter((fund) => fund.ticker.includes(query));
  if (tickerContains.length > 0) return tickerContains;

  return state.data.funds.filter((fund) => matchesSearch(fund, query)).slice(0, 50);
}

function createPendingTicker(ticker) {
  return {
    ticker,
    name: "待接入行情源",
    group: "US Listed",
    category: "Stock",
    leverage: "1x",
    score: 0,
    weekChange: null,
    monthChange: null,
    price: null,
    pending: true
  };
}

function compare(a, b) {
  const direction = state.sortDirection === "asc" ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") return (a - b) * direction;
  return String(a).localeCompare(String(b)) * direction;
}

function getScoreBand(score) {
  if (score >= 80) return { label: "Strong Bullish", className: "strong-bullish" };
  if (score >= 60) return { label: "Bullish", className: "bullish" };
  if (score >= 50) return { label: "Neutral", className: "neutral" };
  if (score >= 31) return { label: "Bearish", className: "bearish" };
  return { label: "Strong Bearish", className: "strong-bearish" };
}

function getScoreColor(score) {
  if (score >= 80) return "#2ecc71";
  if (score >= 60) return "#36c96f";
  if (score >= 50) return "#f4c542";
  if (score >= 31) return "#ff9f43";
  return "#ff5c73";
}

function formatPercent(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatMaybePercent(value) {
  return typeof value === "number" ? formatPercent(value) : "—";
}

function formatMaybePrice(value) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : "—";
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

