function BugsTailStream() {
	this.source = null;
	
	this.start = function () {
		    		var numeroCards = 0;
		    		
					var cards = document.getElementById("customError");
					
					// Recurso rest que retorna las excepciones
					var sourceUrl ="/api/v1/stream/view/errors"; 
					
					// Llamando al servicio rest que emite las excepciones
					this.source = new EventSource(sourceUrl);
					
					// Listener que escucha la emision de items por parte del servicio
					this.source.addEventListener("message", function (event) {
																	
																	document.getElementById("loadingGif").hidden = false;
																	setTimeout(function(){}, 300000);
						
																	var bug = JSON.parse(event.data);
																	
																	// Informacion del Registro
																	var codigo = bug.codigo;
																	var fecha  = bug.fecha;
																	
																	// Informacion del origen de la excepcion
																	var infoCodigoVista  = bug.informacion.codigoVista;
																	var infoTipoVista    = bug.informacion.tipoVista;
																	var infoNombreClase  = bug.informacion.nombreClase;
																	var infoNombreMetodo = bug.informacion.nombreMetodo;
																	
																	// Informacion del detalle de la excepcion
																	var expCausa   = bug.detailExcepcion.causa;
																	var expClase   = bug.detailExcepcion.clase;
																	var expLocaliz = bug.detailExcepcion.localizacionMensaje;
																	var expMensaje = bug.detailExcepcion.mensaje;
																	var expTraza   = bug.detailExcepcion.detalleTraza;
																	
																	// Plantilla de las Card de bootstrap 4.0
																	var card = '<div class="card shadow p-4 mt-3 bg-white espacio">' +
														                	   '	<div class="row">' +
												                    		   '		<div class="col-md-8 px-3">' +
												                      		   '			<div class="card-block px-3">' +
				    													       '                <a href="/bug/' + codigo + '" class="customLink" target="_blank"><h3 class="card-title errorTitle"><span>' + infoTipoVista + " " + infoNombreClase + '</span></h3></a>' +
				    													       '                <h6 class="card-text errorTitleDetail"><span>' + codigo + " - " + infoNombreMetodo + " - " + fecha + '</span></h6>' +				    													     
				    													       '                <p class="card-text errorDetail">' + expTraza + '</p>' +
				    													       '                <a href="/bug/' + codigo + '" target="_blank" class="btn btn-primary">Leer mas...</a>' +
				    													       '            </div>' +
				    													       '        </div>' +
				    													       '     </div>' +
				    													       '</div>';
																	
																	// Parseando la plantalla de String a HTML
				    											    var parser = new DOMParser();
				    											    var html = parser.parseFromString(card, 'text/html');   
				    													       
				    											    // Agregando las Card con la informacion de la excepcion segun llegan
																	cards.prepend(html.body.firstChild);
																	document.getElementById("loadingGif").hidden = true;																	
															});
					
						this.source.onerror = function () {
		                    this.close();
		                };
				 };
				 
				 this.stop = function() {
		                this.source.close();
		         }
}

bugsTailStream = new BugsTailStream();

window.onload = function() {
					bugsTailStream.start();					
				};

window.onbeforeunload = function() {
							bugsTailStream.stop();							
						}