myLink = joint.shapes.devs.Link.extend({

    nome: "",
    //  es nome = r_44

    esportaXML: function(){
        var out ='<relation name="' + this.nome + '" class="package.Relation"/>';
        var source = this.getSourceElement();
        var target = this.getTargetElement();
        
        out += '<link port="'+ source.nome +'_'+source.id+'.'+this.attributes.source.port
                +'" relation="'+this.nome+'"/>';
        out += '<link port="'+ target.nome +'_'+target.id+'.'+this.attributes.target.port
                +'" relation="'+this.nome+'"/>';
                        
        return out;
    },
    
    

});