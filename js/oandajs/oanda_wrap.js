//Ext.require('Ext.slider.*');
scripturl = "///u-f.github.io/js/oandajs/oanda.js";
globalotrades = {};
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
            this.up('form').getForm().reset();
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
var ddmenudata = Ext.create('Ext.data.Store', {
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
            OANDA.rate.instruments(acctsArr[0], ["interestRate", "instrument"], function(x) {
                console.log(x);
                instArr = x.instruments;
                pairArr = instArr.map(function(x){return (x.instrument)});
                ratesObj = {};
                for (var ea in instArr) {
                    for (var cur in instArr[ea].interestRate) {
                        //console.log(cur, instArr[ea].interestRate[cur]  );
                        ratesObj[cur] = instArr[ea].interestRate[cur];
                    }
                }
            })
        });
    } //
colDef = {
    id: "A",
    instrument: "B",
    price: "C",
    side: "D",
    stopLoss: "E",
    takeProfit: "F",
    time: "G",
    trailingAmount: "H",
    trailingStop: "I",
    units: "J"
}
t2t = function(tobj, cr) {
    var ret = "";
    for (var ea in tobj) {
        ret += set_str(colDef[ea] + cr, tobj[ea])
    }
    return ret;
}
otdisplay = function() {
    var rowctr = 1;
    var comm = "";
    for (var ea in globalotrades) {
        for (var trad in globalotrades[ea]) {
            //console.log(globalotrades[ea][trad]);
            comm += t2t(globalotrades[ea][trad], rowctr);
            rowctr++;
        }
    }
    LCexec(comm);
    console.log(comm);
}
omview = function() {}
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
if (localStorage.getItem("_otoken") != null) _otoken = localStorage.getItem("_otoken"); // Yes i entirely dislike conditional assignments. Sue me.
if (typeof _otoken == "undefined" || !validateTok(_otoken)) {
    owinname = displayWin("Oanda access info", UIObject)
} else {
    loadScript(scripturl, oinit);
    setupOmenu();
}
