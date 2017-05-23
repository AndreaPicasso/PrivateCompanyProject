function ContextMenu(){
        /*
            TODO: implementare mostra descrizione al click ed al rightclick o specificare differenze da srs
        */
    this.operatore = "";

    this.createContextMenu = function(cellView,evt,x,y,$window){
            this.operatore = cellView.model;
            evt.stopPropagation();
            evt.preventDefault(); 
            var $contextMenu = $('<div id="context-menu"></div>');
            var height = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            $contextMenu.css({
                width: '100%',
                height: height + 'px',
                position: 'absolute',
                top: evt.clientY+'px',
                left: evt.clientX+'px',
                zIndex: 9999,
                "max-height" : window.innerHeight - 3,
            });
            $contextMenu.addClass('angular-bootstrap-contextmenu dropdown clearfix');
            var $ul = $('<ul>');
                $ul.css({
                    display: 'block',
                    position: 'relative',
                    left: 0,
                    top: 0,
                    "z-index": 10000
                });
            $ul.addClass('dropdown-menu');
            var $ellimina = $('<button class="btn dropdown-toggle" style="width:100%">Ellimina</button>');

            //ELLIMINA
            $ellimina.on('mousedown', function (e) {
                ellimina(cellView);
            });
            $ul.append($ellimina);
            var $settaparam = $('<button class="btn dropdown-toggle" style="width:100%">Setta Parametri</button>');
            
            //SETTA PARAMETRI
            $settaparam.on('mousedown', function (e) {
                setParam(cellView, $window);
            });

            
            $ul.append($settaparam);
            $contextMenu.append($ul);
            $(document).find('body').append($contextMenu);

            $(document.body).on('mousedown', function (e) {
                $("#context-menu").remove();
            });
    }




    var ellimina = function(cellView){
        cellView.model.remove();
        //L'elliminazione dei link ad esso attaccati viene fatta in automatico
    }



    var setParam = function(cellView, $window){
        if(cellView.model.hasParametro == 'true'){
            var corretto = false;
            var i;
            console.log(cellView.model.paramOption);
            while(!corretto){
                
                var newValue = $window.prompt("Inserisci "+cellView.model.nomeParametro+":",
                        cellView.model.paramValue);
                        
               if(cellView.model.paramOption[0]=="all" || cellView.model.paramOption[0]=="empty"){
                   console.log("break");
                   corretto=true;
               }
               console.log(cellView.model.paramOption);
               for(i=0; i<cellView.model.paramOption.length;i++){
                   console.log("dentro for");
                   if(newValue==cellView.model.paramOption[i]){
                       corretto=true;
                        console.log("dentro if");
                       
                   }
               }
               console.log("dentro while3");
               
            }
            cellView.model.paramValue = newValue;
        }
        else{
            $window.alert("L'operatore selezionato non ha parametri");
        }

    }


}