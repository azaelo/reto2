function consultar() {

    $.ajax (
               {
                        url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
                        type         : 'GET',
                        dataType     : 'json',
 
                        success      :  function(response){
                            var misItems=response.items;

                                            
                                            for (i=0; i < misItems.length; i++){
                                                $("#consultaClientes").append("<tr class='even pointer'>");
                                                // $("#consultaClientes").append("<td class='a-center'>" + "<input type= 'checkbox' class='flat' name= 'table_records'>" + "</td>");
                                                $("#consultaClientes").append("<td>" + misItems[i].id + "</td>");
                                                $("#consultaClientes").append("<td>" + misItems[i].name + "</td>");
                                                $("#consultaClientes").append("<td>" + misItems[i].email + "</td>");
                                                $("#consultaClientes").append("<td>" + misItems[i].age + "</td>");
                                                $("#consultaClientes").append('<td><button class="btn btn-info btn-sm"  onclick="borrar('+misItems[i].id+'), location.reload()">Eliminar</button></td>');
                                                $("#consultaClientes").append('<td><button  class="btn btn-info btn-sm"   onclick="obtenerItemEspecifico('+misItems[i].id+')">Ver detalles y editar</button></td>');
                                                $("#consultaClientes").append("</tr>");
                                            }
                                           
                                         },
                        error        :   function(jqXHR, textStatus, errorThrown){
                                            
                                        }
               }

           );

}
function insertar() {
    var crea_Cliente;

    crea_Cliente = { id:$('#cliente_id').val(), name:$('#nombre').val(), email:$('#email').val(), age:$('#age').val()}; //{id:3, name:'andres', email:'andrescomcom', age: 65}

// var dataToSend=JSON.stringify(crea_Cliente);  // JSON Java Script Object Notation
// console.log(dataToSend);

    $.ajax (
        {

            // dataType: 'Json',
            url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'POST',
            data         :  crea_Cliente,

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
        url:"https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
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

    datosCliente      = {id : $("#idCambiar").val(), name : $("#nombre").val(), email: $("#email").val(), age: $("#edad").val() };
    datosEnvio   = JSON.stringify(datosCliente);


    $.ajax (
                {

                    url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
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

                    url          : 'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client' + codigo ,
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
        url:'https://g3dfaaa3dcf4589-disfracesbd.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/'+idItem,
        type:'GET', 

        success:function(response) {
        var item=response.items[0]; 
        $("#idCambiar").val(item.id),
        $("#nombre").val(item.name),
        $("#email").val(item.email),
        $("#edad").val(item.age)
        //$("#name").val(item.name)               
        },
        error: function(jqXHR, textStatus, errorThrown){ 
            
        }
    })
}