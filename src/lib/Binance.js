export default class BinanceApiClient {
  constructor(){
    this.depthData = {};
  }
  /**
   *
   * @param  {...string} args
   */
  connect(...args) {
    let streams = [];
    args.forEach(arg => {
      let command = arg.split(' ');
      switch(command[0]){
      case 'ticker':
        streams.push(command[1].toLowerCase().replace('/', '') + '@ticker');
        break;
      case 'trade':
        streams.push(command[1].toLowerCase().replace('/', '') + '@trade');
        break;
      case 'depth':
        fetch('/request.json?' + encodeURIComponent('https://www.binance.com/api/v1/depth?symbol=' + command[1].replace('/', '') + '&limit=1000'))
          .then(responce => responce.json())
          .then(data => this.initDepthData(command[1].toLowerCase().replace('/', ''), data));
        streams.push(command[1].toLowerCase().replace('/', '') + '@depth');
        break;
      }
    });
    const socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=' + streams.join('/'));
    const name = 'Binance';

    socket.addEventListener('message',  (event) => {
      const json = this.onReceiveData(event.data);
    });
    socket.addEventListener('open', (evt) => {
      console.log(name + ': Websocket通信開始');
    });
    socket.addEventListener('close', function (event) {
      console.log('WebSocket: close');
    });
    socket.addEventListener('error', function (event) {
      console.log('WebSocket: error');
    });
  }


  initDepthData(symbol, data) {
    this.depthData[symbol] = {
      symbol: symbol,
      lastUpdateId: data.lastUpdateId,
      bids: data.bids,
      asks: data.asks,
      initialState: true
    };
  }
  updateDepthData(symbol, data) {
    let d = this.depthData[symbol];
    if(!d)return;
    if(d.initialState){
      if(!(data.U <= d.lastUpdateId+1 && d.lastUpdateId +1 <= data.u) || data.u < d.lastUpdateId)return false;
    } else {
      if(d.lastUpdateId + 1!= data.U) return false;
    }
    data.b.forEach(v => {
      let idx = d.bids.findIndex(ele => ele[0] == v[0]);
      if(v[1] == 0){
        d.bids.splice(idx, 1);
      } else if(idx == -1) {
        d.bids.push(v);
      } else {
        d.bids[idx][1] = v[1];
      }
    });
    d.bids.sort((a, b) => a[0] - b[0]);
    data.a.forEach(v => {
      let idx = d.asks.findIndex(ele => ele[0] == v[0]);
      if(v[1] == 0) {
        d.asks.splice(idx, 1);
      } else if(idx == -1) {
        d.asks.push(v);
      } else {
        d.asks[idx][1] = v[1];
      }
    });
    d.asks.sort((a, b) => a[0] - b[0]);
    d.lastUpdateId = data.u;
    return true;
  }
  onReceiveData(res) {
    const json = JSON.parse(res);
    const data = json.data;
    let result = null;
    switch (json.stream.match(/@.+/)[0]) {
    case '@miniTicker':
      result = {
        type: 'tick',
        data: {
          type: data.e,
          timestamp: data.E,
          symbol: data.s,
          open: data.o,
          close: data.c,
          high: data.h,
          low: data.l,
          volume: data.v,
          quote: data.q
        }
      };
      break;
    case '@ticker':
      result = {
        type: 'tick',
        data: {
          type: data.e,
          timestamp: data.E,
          symbol: data.s,
          change: data.p,
          changeRatio: data.P,
          weightedAverage: data.w,
          firstTrade: data.x, //before 24hr
          lastQuantity: data.Q,
          bestBid: data.b,
          bestBidQuantity: data.B,
          bestAsk: data.a,
          bestAskQuantity: data.A,
          open: data.o,
          last: data.c,
          high: data.h,
          low: data.l,
          totalBaseVolume: data.v,
          totalQuoteVolume: data.q,
          openTime: data.O,
          closeTime: data.c,
          firstTradeId: data.F,
          lastTradeId: data.L,
          totalNumberTrades: data.n
        }
      };
      break;
    case '@trade':
      result = {
        type: 'trade',
        data: {
          type: data.e,
          timestamp: data.E,
          symbol: data.s,
          tradeId: data.t,
          price: data.p,
          quantity: data.q,
          buyerOrderId: data.b,
          sellerOrderId: data.a,
          tradeTimestamp: data.T,
          isBuyerMarketMaker: data.m,
          ignore: data.M
        }
      };
      break;
    case '@depth5':
    case '@depth10':
    case '@depth20':
      result = {
        type: 'depth',
        data: {
          lastUpdateId: data.lastUpdateId,
          bids: data.bids,
          asks: data.asks
        }
      };
      break;
    case '@depth':
      const symbol = json.stream.match(/^.+@/)[0].slice(0,-1);
      if(!this.updateDepthData(symbol, data))return null;
      result = {
        type: 'depth',
        data: this.depthData[symbol]
      };
      break;
    default:
      return null;
    }
    const newEv = new CustomEvent(result.type, { detail: result.data });
    document.dispatchEvent(newEv);
  }
}

