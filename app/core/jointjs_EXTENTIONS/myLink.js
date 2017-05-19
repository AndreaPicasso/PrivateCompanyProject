myLink = joint.shapes.devs.Link.extend({

    nome: "",
    //  es nome = r_44

    esportaXML: function(){
        var out ='<relation name="' + nome + '" class="package.Relation"/>';
        var source = this.getSourceElement();
        var taget = this.getTargetElement();
        
        out += '<link port="'+ source.nome +'.'+this.attributes.source.id+'" relation="'+this.nome+'"/>';
        out += '<link port="'+ target.nome +'.'+this.attributes.target.id+'" relation="'+this.nome+'"/>';
        
    },
    
    

});