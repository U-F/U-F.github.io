//Ext.require('Ext.slider.*');
scripturl = "///u-f.github.io/js/oandajs/oanda.js";
globalotrades = {};
globaloquotes = {};
ddmenudata = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [{
        "abbr": "https://api-fxtrade.oanda.com",
        "name": "FxTrade Live"
    }, {
        "abbr": "https://api-fxpractice.oanda.com",
        "name": "FxPractice (Demo -- disabled)"
    }, {
        "abbr": "whatev",
        "name": "FxSandbox (disabled)"
    }]
});
UIObject = {
    xtype: "form",
    url: 'yadayadadeketethis',
    frame: true,
    id: "oform",
    title: 'Please provide your access token',
    bodyStyle: 'padding:5px 5px 0',
    width: 350,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 125
    },
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    items: [{
        fieldLabel: 'Access Token',
        name: 'tok',
        id: "toktxt",
        allowBlank: false
    }, {
        fieldLabel: 'User name',
        name: 'last'
    }, {
        xtype: "combo",
        fieldLabel: "Text",
        name: "combovalue",
        store: ddmenudata,
        hiddenName: "combovalue",
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr'
    }],
    buttons: [{
        text: 'Reset',
        handler: function() {
            alert("do you it yourself")
        }
    }, {
        text: 'Submit',
        formBind: false, //only enabled once the form is valid
        disabled: false,
        handler: function(a, b, c) {
            //console.log(a,b,c);
            var val = EL("toktxt-inputEl").value;
            if (validateTok(val)) {
                _otoken = val;
                localStorage.setItem("_otoken", _otoken);
                loadScript(scripturl, oinit);
                top[owinname].close();
                setupOmenu();
            } else {
                alert("malformed token");
            }
            // val you seek is EL("toktxt-inputEl").value
        }
    }]
};
// see http://docs.sencha.com/extjs/4.1.3/extjs-build/examples/form/field-types.html    
// http://try.sencha.com/extjs/4.1.0/docs/Ext.form.field.ComboBox.1/ for other formfield types
dump = function(a, b, c, d, e) {
    console.log(a, b, c, d, e)
}

oo2ohlc= function(o){    return (o.time + "," + o.openBid + "," + o.highBid + "," + o.lowBid + "," + o.closeBid +"\n") }

oo2al= function(o){    return ([+new Date(o.time) , o.openBid , o.highBid , o.lowBid , o.closeBid]) }


dumpcandle = function(sym) {
//OANDA.rate.history(sym,{},function(x){console.log(x);console.log(x.candles.map(oo2ohlc).join(""))})
OANDA.rate.history(sym,{count:5000,granularity:"M5"},function(x){
    console.log(x);
    console.log(x.candles.map(oo2al));
    open_cand(x.candles.map(oo2al),sym,true);
    
    })
}



refreshQuotes = function(cb) {
    OANDA.rate.quote(pairArr, function(x) {
        lastquote = x;
        //console.log("WTF",x,"WTF");
        
        
        oquotes = {};
        
        x.prices.map(function(a) {
            oquotes[a.instrument] = a
        })
        for (var ac in globalotrades) {
            for (var t in globalotrades[ac]) {
                //console.log( oquotes[globalotrades[ac].instrument].bid , oquotes[globalotrades[ac].instrument].ask  ,  globalotrades[ac].side)
                //console.log(globalotrades[ac][t].instrument,oquotes[globalotrades[ac][t].instrument])
                if (oquotes[globalotrades[ac][t].instrument]) { globalotrades[ac][t].curprice = globalotrades[ac][t].side == "buy" ? oquotes[globalotrades[ac][t].instrument].bid : oquotes[globalotrades[ac][t].instrument].ask }
                // may get rid of the if maybe
                
            }
        }
        cb(x, oquotes);
    })
}
receivedTrades = function(acct, tobj) {
    globalotrades[acct] = tobj.trades;
}
oinit = function() {
    OANDA.account.list("", function(a) {
        acctsObj = a;
        recvrFuncs = [];
        acctsArr = acctsObj.accounts.map(function(a) {
            return a.accountId
        })
        for (var idx in acctsArr) {
            recvrFuncs.push(eval("WTF=function(x){var thisAcctNo=" + acctsArr[idx] + ";receivedTrades(thisAcctNo,x);console.log(thisAcctNo,x)}")); //
            OANDA.trade.list(acctsArr[idx], {}, recvrFuncs[idx]);
        }
        OANDA.rate.instruments(acctsArr[0], ["interestRate", "instrument", "halted","pip","precision"], function(x) {
            console.log(x);
            instArr = x.instruments;
            pairArr = instArr.map(function(x) {
                return (x.instrument)
            });
            setupOCmenu(pairArr);
            refreshQuotes(dump);
            ratesObj = {};
            for (var ea in instArr) {
                for (var cur in instArr[ea].interestRate) {
                    //console.log(cur, instArr[ea].interestRate[cur]  );
                    ratesObj[cur] = instArr[ea].interestRate[cur];
                }
            }
        })
    });
}
colDefTrades = {
    id: "A",
    instrument: "B",
    price: "C",
    side: "D",
    stopLoss: "E",
    takeProfit: "F",
    time: "G",
    trailingAmount: "H",
    trailingStop: "I",
    units: "J",curprice:"K"
}
t2t = function(tobj, cr,cd) {
        var ret = "";
        for (var ea in tobj) {
            ret += set_str(cd[ea] + cr, tobj[ea])
        }
        return ret;
    } 
otdisplay = function() {
    var rowctr = 1;
    var comm = "";
    for (var ea in globalotrades) {
        for (var trad in globalotrades[ea]) {
            //console.log(globalotrades[ea][trad]);
            comm += t2t(globalotrades[ea][trad], rowctr,colDefTrades);
            rowctr++;
        }
    }
    LCexec(comm);
    console.log(comm);
}
omview = function() {
    refreshQuotes(dump);
}

setupOCmenu = function(carr){
    
    var my_values;
    my_values=carr.map(function(x){return [x]});
    
    curddmenu = new Ext.form.ComboBox({
    //fieldLabel: 'Number',
    labelStyle: 'width:50px',
    width:100,
    hiddenName: 'number',
    store: new Ext.data.SimpleStore({
        fields: ['number'],
        data : my_values 
    }),
    displayField: 'number',
    typeAhead: true,
    mode: 'local',
    triggerAction: 'all',
    emptyText:'Instruments',
    selectOnFocus:true,
    listeners: {
        'select': function(obj) {
            var sym =obj.value;
dumpcandle(sym);
}
    }
});

tb.insert(0, curddmenu)
    
}


setupOmenu = function() {
    omenu = Ext.create('Ext.menu.Menu', {
        id: 'oMenu',
        items: [{
            text: "Account Consolidation",
            handler: otdisplay
        }, {
            text: "Market View",
            handler: omview
        }, {
            text: "Position Consolidation",
            handler: function() {}
        }, {
            text: "Trading",
            handler: function() {
                alert("Not implemented in this version")
            }
        }]
    });
    tb.add({
        text: 'OANDA',
        // iconCls: 'bmenu', // <-- icon
        menu: omenu
    });
}
validateTok = function(val) {
    return (val.length == 65 && val[32] == "-")
}
displayWin = function(wintitle, itemsObj) {
    wintitle = (wintitle == undefined) ? "Message Window" : wintitle;
    var rnd = Math.random();
    var winname = "msg_win" + rnd;
    top[winname] = Ext.create('widget.window', {
        x: 12,
        title: wintitle,
        maximizable: true,
        resizable: true,
        collapsible: true,
        closable: true,
        closeAction: 'destroy',
        //animateTarget: this,
        width: 700,
        height: 200,
        layout: 'fit',
        bodyStyle: 'padding: 5px;',
        items: itemsObj
    });
    top[winname].show();
    return (winname);
}

    open_cand = function(data_arr,title,external){
            external = (external === undefined) ? false : external;
            var gv= (external == true) ? window.open("static/support/can/display.html","_blank") : openwin("static/support/can/display.html",title) ; 
            extwindows.push({typ:"CDL",wref:gv,title:title,datarr:data_arr})
    }




if (localStorage.getItem("_otoken") != null) _otoken = localStorage.getItem("_otoken"); // Yes i entirely dislike conditional assignments. Sue me.
if (typeof _otoken == "undefined" || !validateTok(_otoken)) {
    owinname = displayWin("Oanda access info", UIObject)
} else {
    loadScript(scripturl, oinit);
    setupOmenu();
}
