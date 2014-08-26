console.log("LOADed!");

   acemenu = Ext.create('Ext.menu.Menu', {
        id: 'aceMenu',
        items: [{
        text: 'ExtEditor Newtab',
        url: 'static/support/exteditor/edit.htm',
        target:_room+"SCRIPT",
        //baseParams: {  q: 'urlparam'},
        tooltip: 'Click here for help.'
    },
    {
        text: 'ExtEditor',
        tooltip: 'External editor in neue fenster yeah.',
        handler:function(){window.open("static/support/exteditor/edit.htm",_room+"SCRIPT","location=0")}
    },
    {
        text: 'ExtEditor inwindow',
        tooltip: '',
        handler:function(){openwin("static/support/exteditor/edit.htm")}
    }        
            
            
            
            ]
    });
    
    tb.add({text:"ACE",menu:acemenu});

/*
  
    tb.add({
        text: 'ExtEditor Newtab',
        url: 'static/support/exteditor/edit.htm',
        target:_room+"SCRIPT",
        //baseParams: {  q: 'urlparam'},
        tooltip: 'Click here for help.'
    });
    
    
 tb.add({
        text: 'ExtEditor',
        tooltip: 'External editor in neue fenster yeah.',
        handler:function(){window.open("static/support/exteditor/edit.htm",_room+"SCRIPT","location=0")}
    });
*/
