function boton(){    // crear producto

        var data={
            id:$("#mid").val(),
            brand:$("#brand").val(),
            model:$("#model").val(),
            category_id:$("#category_id").val(),
            name: $("#name").val()
        }

var dataToSend=JSON.stringify(data);  // JSON Java Script Object Notation
console.log(dataToSend);
  
    $.ajax({
        dataType: 'Json',
        data:data,  // envía el dato completo para el manejador POST
        url:"https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:'POST',
        success:function(response) {
            console.log(response);
            
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}


function obtenerItems(){ //consultar

    $.ajax({
        dataType: 'json',
        url:"https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:'GET',
        
        success:function(response) {
         
          var misItems=response.items;
  
          for(i=0;i<misItems.length;i++){
           
            $("#items").append("<tr>");
            $("#items").append("<td>"+misItems[i].brand+"</td>");
            $("#items").append("<td>"+misItems[i].model+"</td>");
            $("#items").append("<td>"+misItems[i].category_id+"</td>");
            $("#items").append("<td>"+misItems[i].name+"</td>");
            $("#items").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button></td>');
            $("#items").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>');
            $("#items").append("</tr>");
  
          }
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }

function borrar(idElemento){
    var data={
        id:idElemento
    }

    var dataToSend=JSON.stringify(data);  // JSON Java Script Object Notation
    console.log(dataToSend);

    $.ajax({
        dataType: 'Json',
        data:dataToSend,  // para el caso de DELETE
        url:"https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:'DELETE',
        contentType:'application/json',  // linea clave para el borrado, action unblock
        success:function(response) {
            console.log(response);
            
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}

function obtenerItemEspecifico(idItem){  // para mostrar los datos
    $.ajax({
        dataType: 'Json',
        url:"https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume/"+idItem,
        type:'GET', 

        success:function(response) {
        var item=response.items[0]; 
        $("#mid").val(item.id),
        $("#brand").val(item.brand),
        $("#model").val(item.model),
        $("#category_id").val(item.category_id),
        $("#name").val(item.name)               
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}   

function actualizar(){

            var data={
                id:$("#mid").val(),
                brand:$("#brand").val(),
                model:$("#model").val(),
                category_id:$("#category_id").val(),
                name: $("#name").val()
            }
    
    var dataToSend=JSON.stringify(data);  // JSON Java Script Object Notation
    console.log(dataToSend);
      
        $.ajax({
            dataType: 'Json',
            data:dataToSend,  // envía el dato completo para el manejador POST
            contentType:'application/json',
            url:"https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
            type:'PUT',
            success:function(response) {
                console.log(response);
                
            },
            error: function(jqXHR, textStatus, errorThrown){ 
                
            }
        });
    }
    