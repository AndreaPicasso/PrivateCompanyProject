'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('myApp').
  component('editor', {
    templateUrl: 'core/editor/editor.component.html',
    controller: function editor(WrapperJoint) {
        /*
            TODO: METTERE FUNZIONE DI CHECK CORRETTEZZA SENSATA
        */
        var controlloCorrettezza = function(sourceView, sourceMagnet, targetView, targetMagnet){
         // PROBLEMA: SOURCEVIEW / Target sono View, non Element
         console.log("SourceView:")
         console.log(sourceView);
         console.log("TargetView:")
         console.log(targetView);
         console.log(sourceMagnet);
         return true;

        }
      /**
       * Prova Operatore Complesso
       */
      var opComp = WrapperJoint.creaFoglioDiLavoroOperatoreComplesso(1000,600,"operatore-complesso",controlloCorrettezza);
      WrapperJoint.aggiungiPorteOpComplesso('in','input1','int');
      WrapperJoint.aggiungiPorteOpComplesso('in','input2','int');
      WrapperJoint.aggiungiPorteOpComplesso('out','out1','double');
      var op1 = WrapperJoint.aggiungiOperatore(300,100,['in1', 'in2'],['out1'], ['int','int'],['int'], 'Somma');
      var op2 = WrapperJoint.aggiungiOperatore(300,200,['in1', 'in2'],['out1'], ['int','int'],['double'], 'Confronto');
      WrapperJoint.connetti(op1,'out1',op2,'in2');
      WrapperJoint.connetti(op2,'in1', op1, 'out1');
      WrapperJoint.connetti(opComp, 'input1',op2,'in2');
      
      WrapperJoint.log();
       /**
       * Prova regola
       */
      /*
      WrapperJoint.creaFoglioDiLavoroRegola(1000,600,"regola",controlloCorrettezza);
      var op1 = WrapperJoint.aggiungiOperatore(10,50,[],['out1'], [],['int'], 'Source');
      WrapperJoint.aggiungiOperatore(10,400,[],['out1'], [],['int'], 'Source');
      var op2 = WrapperJoint.aggiungiOperatore(300,100,['in1', 'in2'],['out1'], ['int','int'],['double'], 'Confronto');
      WrapperJoint.aggiungiOperatore(500,100,['in1'],[],['double'],[],'Sink');
      WrapperJoint.connetti(op1,'out1',op2,'in2');
      //WrapperJoint.log();
      */
    }
  });
