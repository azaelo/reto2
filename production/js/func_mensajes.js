function consultar() {

    $.ajax (
               {
                        url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                        type         : 'GET',
                        dataType     : 'json',
                        
                        success      :  function(response){
                            var misItems=response.items;

                                            
                                            for (i=0; i < misItems.length; i++){
                                                $("#consultaMensajes").append("<tr class='even pointer'>");
                                                // $("#consultaMensajes").append("<td class='a-center'>" + "<input type= 'checkbox' class='flat' name= 'table_records'>" + "</td>");
                                                $("#consultaMensajes").append("<td>" + misItems[i].id + "</td>");
                                                $("#consultaMensajes").append("<td>" + misItems[i].messagetext + "</td>");
                                                $("#consultaMensajes").append('<td><button class="btn btn-info btn-sm" onclick="borrar('+misItems[i].id+'), location.reload()">Eliminar</button></td>');
                                                $("#consultaMensajes").append('<td><button class="btn btn-info btn-sm" onclick="obtenerItemEspecifico('+misItems[i].id+')">Ver detalles y editar</button></td>');
                                                $("#consultaMensajes").append("</tr>");
                                            }

                                         },
                        error        :   function(jqXHR, textStatus, errorThrown){
                                            
                                        }
               }

           );

}
function insertar() {
    var disfraz;

    disfraz = { id:$('#mensaje_id').val() , messagetext:$('#mensaje').val()};

    $.ajax (
        {

            url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type         : 'POST',
            data         :  disfraz,

            success      :  function(response){
                               console.log(response);
                            },
            error       :   function(xhr,status){
                            console.log( xhr);

                            }


        }
    );



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
        url:"https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:'DELETE',
        contentType:'application/json',  // linea clave para el borrado, action unblock
        success:function(response) {
            console.log(response);
            
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}

function actualizar() {

    datomensaje      = { id:$('#mensaje_id').val() , messagetext:$('#mensaje').val() };
    datosEnvio   = JSON.stringify(datomensaje);


    $.ajax (
                {

                    url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                }
            );



}
function consultarId() {

    var codigo =$("#idCodigo").val();

    $.ajax (
                {

                    url          : 'https://g23bfb99f5036e6-bdpais.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/planeta/planeta/' + codigo ,
                    type         : 'GET',
                    dataType     : 'json',

                    success      :  function(json){
                                        $("#idDivConsulta").empty();
                                        for (i=0; i < json.items.length; i++){
                                            $("#idDivConsulta").append(json.items[i].codigo + json.items[i].nombre + " ");
                                        }
                                        console.log(json)
                                    },
                    error       :   function(xhr,status){
                                        console.log(xhr)
                                    },



                }
            );


}
function obtenerItemEspecifico(idItem){  // para mostrar los datos
    $.ajax({
        dataType: 'Json',
        url:'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/'+idItem,
        type:'GET', 

        success:function(response) {
        var item=response.items[0]; 
        $("#mensaje_id").val(item.id),
        $("#mensaje").val(item.messagetext)
                       
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}