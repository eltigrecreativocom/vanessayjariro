// Sistema dinámico para cargar datos de la boda
class BodaDinamica {
    constructor() {
        this.datos = null;
        this.init();
    }

    async init() {
        try {
            await this.cargarDatos();
            this.renderizarContenido();
            this.inicializarFuncionalidades();
        } catch (error) {
            console.error('Error al inicializar la boda dinámica:', error);
        }
    }

    async cargarDatos() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.datos = await response.json();
            console.log('Datos cargados exitosamente:', this.datos);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            throw error;
        }
    }

    renderizarContenido() {
        if (!this.datos) return;

        // Actualizar metadatos
        this.actualizarMetadatos();

        // Actualizar contenido de la pareja
        this.actualizarPareja();

        // Actualizar padres
        this.actualizarPadres();

        // Actualizar padrinos
        this.actualizarPadrinos();

        // Actualizar fechas
        this.actualizarFechas();

        // Actualizar calendario
        this.actualizarCalendario();

        // Actualizar versículo
        this.actualizarVersiculo();

        // Actualizar ceremonias
        this.actualizarCeremonias();

        // Actualizar recepción
        this.actualizarRecepcion();

        // Actualizar itinerario
        this.actualizarItinerario();

        // Actualizar vestimenta
        this.actualizarVestimenta();

        // Actualizar confirmación
        this.actualizarConfirmacion();

        // Actualizar regalos
        this.actualizarRegalos();

        // Actualizar textos generales
        this.actualizarTextos();

        // Actualizar imágenes
        this.actualizarImagenes();
    }

    actualizarMetadatos() {
        const { metadatos } = this.datos;
        document.title = metadatos.titulo;

        // Open Graph
        this.actualizarMeta('og:title', metadatos.titulo);
        this.actualizarMeta('og:description', metadatos.descripcion);
        this.actualizarMeta('og:image', metadatos.ogImage);
        this.actualizarMeta('og:url', metadatos.ogUrl);

        // Twitter Card
        this.actualizarMeta('twitter:title', metadatos.titulo);
        this.actualizarMeta('twitter:description', metadatos.descripcion);
        this.actualizarMeta('twitter:image', metadatos.ogImage);
    }

    actualizarMeta(property, content) {
        const meta = document.querySelector(`meta[property="${property}"]`) ||
            document.querySelector(`meta[name="${property}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    }

    actualizarPareja() {
        const { pareja } = this.datos;

        // Nombres en títulos principales
        this.actualizarTexto('[data-nombre="titulo-pareja"]', pareja.nombreCompleto);
        this.actualizarTexto('[data-nombre="iniciales"]', pareja.iniciales);
        this.actualizarTexto('[data-nombre="nombres-firma"]', `${pareja.novia} & ${pareja.novio}`);

        // Fallback para elementos sin data attributes
        const titulosPrincipales = document.querySelectorAll('.titulo');
        titulosPrincipales.forEach(titulo => {
            if (titulo.textContent.includes('Julieta y David')) {
                titulo.textContent = pareja.nombreCompleto;
            } else if (titulo.textContent.includes('J & D')) {
                titulo.textContent = pareja.iniciales;
            }
        });
    }

    actualizarPadres() {
        const { padres } = this.datos;

        // Actualizar información de padres de la novia
        this.actualizarTexto('[data-padres="titulo-novia"]', padres.novia.titulo);
        this.actualizarTexto('[data-padres="padre-novia"]', padres.novia.padre);
        this.actualizarTexto('[data-padres="madre-novia"]', padres.novia.madre);

        // Actualizar información de padres del novio
        this.actualizarTexto('[data-padres="titulo-novio"]', padres.novio.titulo);
        this.actualizarTexto('[data-padres="padre-novio"]', padres.novio.padre);
        this.actualizarTexto('[data-padres="madre-novio"]', padres.novio.madre);
    }

    actualizarPadrinos() {
        const { padrinos } = this.datos;

        // Actualizar información de padrinos de aros
        this.actualizarTexto('[data-padrinos="titulo-aros"]', padrinos.aros.titulo);
        this.actualizarTexto('[data-padrinos="padrino-aros"]', padrinos.aros.padrino);
        this.actualizarTexto('[data-padrinos="madrina-aros"]', padrinos.aros.madrina);

        // Actualizar padrinos de religioso
        if (padrinos.religioso && padrinos.religioso.length > 0) {
            // Primer par de padrinos de religioso
            this.actualizarTexto('[data-padrinos="titulo-religioso"]', padrinos.religioso[0].titulo);
            this.actualizarTexto('[data-padrinos="padrino-religioso-1"]', padrinos.religioso[0].padrino);
            this.actualizarTexto('[data-padrinos="madrina-religioso-1"]', padrinos.religioso[0].madrina);

            // Segundo par de padrinos de religioso (si existe)
            if (padrinos.religioso[1]) {
                this.actualizarTexto('[data-padrinos="padrino-religioso-2"]', padrinos.religioso[1].padrino);
                this.actualizarTexto('[data-padrinos="madrina-religioso-2"]', padrinos.religioso[1].madrina);
            }
        }
    }

    actualizarFechas() {
        const { fecha } = this.datos;

        this.actualizarTexto('[data-fecha="evento"]', fecha.fechaTexto);

        // Fallback
        const fechaElementos = document.querySelectorAll('.fecha');
        fechaElementos.forEach(el => {
            if (el.textContent.includes('8 de octubre')) {
                el.textContent = fecha.fechaTexto;
            }
        });
    }

    actualizarCalendario() {
        const { fecha } = this.datos;
        const fechaEvento = new Date(fecha.fechaEvento);

        // Obtener información de la fecha
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        const diasSemana = [
            'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
        ];

        const mes = meses[fechaEvento.getMonth()];
        const dia = fechaEvento.getDate();
        const año = fechaEvento.getFullYear();
        const diaSemana = diasSemana[fechaEvento.getDay()];

        // Actualizar elementos del calendario
        this.actualizarTexto('[data-calendario="mes"]', mes.charAt(0).toUpperCase() + mes.slice(1));
        this.actualizarTexto('[data-calendario="dia"]', dia.toString());
        this.actualizarTexto('[data-calendario="año"]', año.toString());
        this.actualizarTexto('[data-calendario="dia-semana"]', diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1));
    }

    actualizarVersiculo() {
        const { versiculo } = this.datos;
        const versiculoEl = document.querySelector('[data-versiculo="texto"]');

        if (versiculoEl) {
            versiculoEl.innerHTML = `${versiculo.texto}<br>${versiculo.referencia}`;
        } else {
            // Fallback: buscar por contenido
            const elementos = document.querySelectorAll('h4');
            elementos.forEach(h4 => {
                if (h4.textContent.includes('Proverbios 18:22')) {
                    h4.innerHTML = `${versiculo.texto}<br>${versiculo.referencia}`;
                }
            });
        }
    }

    actualizarCeremonias() {
        const { ceremonias } = this.datos;

        ceremonias.forEach((ceremonia, index) => {
            // Actualizar título
            this.actualizarTexto(`[data-ceremonia-titulo="${index}"]`, ceremonia.titulo);

            // Actualizar hora
            this.actualizarTexto(`[data-ceremonia-hora="${index}"]`, `Hora: ${ceremonia.hora}`);

            // Actualizar lugar
            this.actualizarTexto(`[data-ceremonia-lugar="${index}"]`, ceremonia.lugar);

            // Actualizar dirección
            this.actualizarTexto(`[data-ceremonia-direccion="${index}"]`, ceremonia.direccion);

            // Actualizar icono
            const icono = document.querySelector(`[data-ceremonia-icono="${index}"]`);
            if (icono) {
                icono.src = `assets/icons/${ceremonia.icono}`;
            }

            // Actualizar enlace del mapa
            const enlaceMapa = document.querySelector(`[data-ceremonia-mapa="${index}"]`);
            if (enlaceMapa) {
                enlaceMapa.href = ceremonia.urlMapa;
            }
        });
    }

    actualizarRecepcion() {
        const { recepcion } = this.datos;

        // Actualizar información de la recepción
        this.actualizarTexto('[data-recepcion="titulo"]', recepcion.titulo);
        this.actualizarTexto('[data-recepcion="mensaje"]', recepcion.mensaje);
        this.actualizarTexto('[data-recepcion="nombre"]', recepcion.nombre);
        this.actualizarTexto('[data-recepcion="lugar"]', recepcion.lugar);
        this.actualizarTexto('[data-recepcion="direccion"]', recepcion.direccion);

        // Actualizar enlace del mapa
        const enlaceMapa = document.querySelector('[data-recepcion="mapa"]');
        if (enlaceMapa) {
            enlaceMapa.href = recepcion.urlMapa;
        }
    }

    actualizarItinerario() {
        const { itinerario } = this.datos;

        // Actualizar eventos usando data-itinerario con información completa
        itinerario.forEach((item, index) => {
            // Actualizar nombre del evento
            const eventoTexto = document.querySelector(`[data-itinerario="evento-${index}"]`);
            if (eventoTexto) {
                eventoTexto.textContent = item.evento;
            }

            // Actualizar hora
            const horaTexto = document.querySelector(`[data-itinerario="hora-${index}"]`);
            if (horaTexto) {
                horaTexto.textContent = item.hora;
            }

            // Actualizar lugar
            const lugarTexto = document.querySelector(`[data-itinerario="lugar-${index}"]`);
            if (lugarTexto && item.lugar) {
                lugarTexto.textContent = item.lugar;
            }

            // Actualizar icono del evento
            const iconoImg = document.querySelector(`[data-itinerario-icono="${index}"]`);
            if (iconoImg) {
                iconoImg.src = `assets/icons/${item.icono}`;
            }
        });

        // Fallback para compatibilidad con diseño anterior
        const timelineContainer = document.querySelector('.timeline');
        if (timelineContainer) {
            const eventos = timelineContainer.querySelectorAll('.evento');
            itinerario.forEach((item, index) => {
                if (eventos[index]) {
                    const evento = eventos[index];
                    const img = evento.querySelector('img');
                    const h5 = evento.querySelector('h5');

                    if (img && !img.hasAttribute('data-itinerario-icono')) {
                        img.src = `assets/icons/${item.icono}`;
                    }
                    if (h5 && !h5.hasAttribute('data-itinerario')) {
                        h5.innerHTML = `${item.evento} <br>${item.hora}`;
                    }
                }
            });
        }
    }

    actualizarVestimenta() {
        const { vestimenta } = this.datos;

        // Usar los nuevos atributos data-*
        this.actualizarTexto('[data-vestimenta="tipo"]', vestimenta.tipo);
        this.actualizarTexto('[data-vestimenta="damas"]', `Damas: ${vestimenta.damas}`);
        this.actualizarTexto('[data-vestimenta="caballeros"]', `Caballeros: ${vestimenta.caballeros}`);

        // Fallback para compatibilidad
        const vestimentaSection = document.querySelector('article.vestimenta');
        if (vestimentaSection) {
            const paragrafos = vestimentaSection.querySelectorAll('p');
            if (paragrafos[0] && !paragrafos[0].hasAttribute('data-vestimenta')) paragrafos[0].textContent = vestimenta.tipo;
            if (paragrafos[1] && !paragrafos[1].hasAttribute('data-vestimenta')) paragrafos[1].textContent = `Damas: ${vestimenta.damas}`;
            if (paragrafos[2] && !paragrafos[2].hasAttribute('data-vestimenta')) paragrafos[2].textContent = `Caballeros: ${vestimenta.caballeros}`;
        }
    }

    actualizarConfirmacion() {
        const { asistencia } = this.datos;

        const enlaceConfirmacion = document.querySelector('[data-asistencia="enlace"]');
        if (enlaceConfirmacion) {
            enlaceConfirmacion.href = asistencia.urlFormulario;
        }

        // Fallback
        const enlaceFallback = document.querySelector('a[href*="forms.gle"]');
        if (enlaceFallback) {
            enlaceFallback.href = asistencia.urlFormulario;
        }
    }

    actualizarRegalos() {
        const { regalos } = this.datos;

        // Título y mensaje principal
        this.actualizarTexto('[data-regalo="titulo"]', regalos.titulo);
        this.actualizarTexto('[data-regalo="mensaje"]', regalos.mensaje);

        // Transferencias bancarias
        const contenedorTransferencias = document.querySelector('[data-regalo="transferencias"]');
        if (contenedorTransferencias && regalos.metodosPago.transferencia) {
            let htmlTransferencias = `<h4>${regalos.metodosPago.transferencia.titulo}</h4>`;
            regalos.metodosPago.transferencia.bancos.forEach(banco => {
                htmlTransferencias += `
                    <div class="banco-info">
                        <strong>${banco.nombre}:</strong> ${banco.cuenta}<br>
                        <em>${banco.titular}</em>
                    </div>
                `;
            });
            contenedorTransferencias.innerHTML = htmlTransferencias;
        }

        // Billeteras digitales
        const contenedorBilleteras = document.querySelector('[data-regalo="billeteras"]');
        if (contenedorBilleteras && regalos.metodosPago.billeteras) {
            let htmlBilleteras = `<h4>${regalos.metodosPago.billeteras.titulo}</h4>`;
            regalos.metodosPago.billeteras.opciones.forEach(opcion => {
                htmlBilleteras += `
                    <div class="billetera-info">
                        <strong>${opcion.tipo}:</strong> ${opcion.numero}<br>
                        <em>${opcion.titular}</em>
                    </div>
                `;
            });
            contenedorBilleteras.innerHTML = htmlBilleteras;
        }

        // Confirmación de asistencia
        this.actualizarTexto('[data-confirmacion="titulo"]', regalos.confirmacion.titulo);
        this.actualizarTexto('[data-confirmacion="mensaje"]', regalos.confirmacion.mensaje);
        this.actualizarTexto('[data-confirmacion="accion"]', regalos.confirmacion.accion);
        this.actualizarTexto('[data-confirmacion="despedida"]', regalos.confirmacion.despedida);
    }

    actualizarTextos() {
        const { textos } = this.datos;

        // Textos principales de invitación
        this.actualizarTexto('[data-texto="titulo-principal"]', textos.invitacion.tituloPrincipal);
        this.actualizarTexto('[data-texto="nos-casamos"]', textos.invitacion.nosCasamos);
        this.actualizarTexto('[data-texto="click-abrir"]', textos.invitacion.clickParaAbrir);
        this.actualizarTexto('[data-texto="bendicion"]', textos.invitacion.bendicion);
        this.actualizarTexto('[data-texto="nosotros"]', textos.invitacion.nosotros);
        this.actualizarTexto('[data-texto="invitacion-mensaje"]', textos.invitacion.invitacionMensaje);
        this.actualizarTexto('[data-texto="presiona-corazon"]', textos.invitacion.presionaCorazon);
        this.actualizarTexto('[data-texto="solo-faltan"]', textos.invitacion.soloFaltan);

        // Etiquetas del contador
        this.actualizarTexto('[data-texto="dias"]', textos.contador.dias);
        this.actualizarTexto('[data-texto="horas"]', textos.contador.horas);
        this.actualizarTexto('[data-texto="minutos"]', textos.contador.minutos);
        this.actualizarTexto('[data-texto="segundos"]', textos.contador.segundos);

        // Ceremonia
        this.actualizarTexto('[data-texto="ver-ubicacion"]', textos.ceremonia.verUbicacion);

        // Botones de ceremonia
        const botonesCeremonia = document.querySelectorAll('[data-ceremonia-mapa]');
        botonesCeremonia.forEach(boton => {
            if (boton.hasAttribute('data-texto')) {
                boton.textContent = textos.ceremonia.verUbicacion;
            }
        });

        // Recepción - usar el mismo texto para ver ubicación
        const botonesRecepcion = document.querySelectorAll('[data-recepcion="mapa"]');
        botonesRecepcion.forEach(boton => {
            if (boton.hasAttribute('data-texto')) {
                boton.textContent = textos.recepcion.verUbicacion;
            }
        });

        // Itinerario
        this.actualizarTexto('[data-texto="itinerario-titulo"]', textos.itinerario.titulo);

        // Vestimenta
        this.actualizarTexto('[data-texto="vestimenta-titulo"]', textos.vestimenta.titulo);        // Asistencia
        this.actualizarTexto('[data-texto="confirmacion-titulo"]', textos.asistencia.confirmacionTitulo);
        this.actualizarTexto('[data-texto="boton-confirmar"]', textos.asistencia.botonConfirmar);
        this.actualizarTexto('[data-texto="sin-ninos-titulo"]', textos.asistencia.sinNinosTitulo);
        this.actualizarTexto('[data-texto="sin-ninos-mensaje"]', textos.asistencia.sinNinosMensaje);

        // Botón de asistencia con enlace
        const botonAsistencia = document.querySelector('[data-asistencia="enlace"]');
        if (botonAsistencia && botonAsistencia.hasAttribute('data-texto')) {
            botonAsistencia.textContent = textos.asistencia.botonConfirmar;
        }

        // Regalos
        this.actualizarTexto('[data-texto="regalos-titulo"]', textos.regalos.titulo);
        this.actualizarTexto('[data-texto="regalos-mensaje"]', textos.regalos.mensaje);
        this.actualizarTexto('[data-texto="boton-ver-mas"]', textos.regalos.botonVerMas);
        this.actualizarTexto('[data-texto="codigo-novios"]', textos.regalos.codigoNovios);
        this.actualizarTexto('[data-texto="cuenta-banco"]', textos.regalos.cuentaBanco);

        // Agradecimientos
        this.actualizarTexto('[data-texto="esperamos"]', textos.agradecimiento.esperamos);
        this.actualizarTexto('[data-texto="gracias"]', textos.agradecimiento.gracias);
    }

    actualizarImagenes() {
        const { medios } = this.datos;

        // Audio - no necesitamos configurar nada aquí para YouTube
        // El inicializarReproductor() se encarga de todo

        // Para compatibilidad con audio tradicional
        if (typeof medios.audio === 'string') {
            const audioPlayer = document.getElementById('audioPlayer');
            if (audioPlayer) {
                const source = audioPlayer.querySelector('source');
                if (source) {
                    source.src = medios.audio;
                }
            }
        }

        // Imágenes
        Object.entries(medios.imagenes).forEach(([key, src]) => {
            const img = document.querySelector(`[data-imagen="${key}"]`);
            if (img) {
                img.src = src;
            }
        });
    }

    actualizarTexto(selector, texto) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.innerHTML = texto;
        }
    }

    inicializarFuncionalidades() {
        // Inicializar contador con la fecha del JSON
        this.inicializarContador();

        // Resto de funcionalidades (música, animaciones, etc.)
        this.inicializarReproductor();
        this.inicializarAnimaciones();
        this.inicializarNavegacion();
    }

    inicializarContador() {
        const fechaEvento = new Date(this.datos.fecha.fechaEvento).getTime();

        const actualizarContador = () => {
            const ahora = new Date().getTime();
            const diferencia = fechaEvento - ahora;

            if (diferencia > 0) {
                const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

                const diasEl = document.getElementById('dias');
                const horasEl = document.getElementById('horas');
                const minutosEl = document.getElementById('minutos');
                const segundosEl = document.getElementById('segundos');

                if (diasEl) diasEl.innerText = dias.toString().padStart(2, '0');
                if (horasEl) horasEl.innerText = horas.toString().padStart(2, '0');
                if (minutosEl) minutosEl.innerText = minutos.toString().padStart(2, '0');
                if (segundosEl) segundosEl.innerText = segundos.toString().padStart(2, '0');
            } else {
                const contadorTexto = document.getElementById('contador-texto');
                const tiempo = document.querySelector('.tiempo');

                if (contadorTexto) contadorTexto.innerText = this.datos.textos.invitacion.eventoComenzo;
                if (tiempo) tiempo.style.display = 'none';
            }
        };

        setInterval(actualizarContador, 1000);
        actualizarContador();
    }

    inicializarReproductor() {
        const { medios } = this.datos;

        // Verificar si tenemos audio de YouTube
        if (medios.audio && medios.audio.tipo === 'youtube') {
            this.inicializarYouTubePlayer(medios.audio.videoId);
        } else {
            // Fallback para audio tradicional
            this.inicializarAudioTradicional();
        }
    }

    inicializarYouTubePlayer(videoId) {
        const playBtn = document.getElementById('playBtn');
        const audioPlayerContainer = document.getElementById('audioPlayerContainer');
        const youtubeContainer = document.getElementById('youtubePlayerContainer');

        if (!playBtn || !audioPlayerContainer) return;

        let player = null;
        let isPlaying = false;

        // Mostrar el container después de 3 segundos
        setTimeout(() => {
            audioPlayerContainer.classList.add('visible');
        }, 3000);

        // Función para inicializar el player de YouTube
        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('youtubePlayer', {
                height: '0',
                width: '0',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'disablekb': 1,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onReady': () => {
                        console.log('YouTube player ready');
                    },
                    'onStateChange': (event) => {
                        if (event.data === YT.PlayerState.ENDED) {
                            // Reiniciar cuando termine
                            player.seekTo(0);
                            player.playVideo();
                        }
                    }
                }
            });
        };

        // Si la API ya está cargada
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }

        playBtn.addEventListener('click', () => {
            if (!player) return;

            if (isPlaying) {
                player.pauseVideo();
                playBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                player.playVideo();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    inicializarAudioTradicional() {
        const audioPlayer = document.getElementById('audioPlayer');
        const playBtn = document.getElementById('playBtn');
        const audioPlayerContainer = document.getElementById('audioPlayerContainer');

        if (!audioPlayer || !playBtn || !audioPlayerContainer) return;

        let isPlaying = false;

        setTimeout(() => {
            audioPlayerContainer.classList.add('visible');
        }, 3000);

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                audioPlayer.play().catch(e => {
                    console.log("La reproducción automática fue bloqueada. Haga clic para iniciar.");
                });
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    inicializarAnimaciones() {
        const animarBarraTiempo = () => {
            const eventos = document.querySelectorAll('.evento');
            const barraFill = document.getElementById('timelineFill');
            const alturaVentana = window.innerHeight;

            eventos.forEach((evento, index) => {
                const posicion = evento.getBoundingClientRect().top;
                if (posicion < alturaVentana * 0.8) {
                    evento.classList.add('visible');
                    if (barraFill) {
                        const progreso = (index + 1) / eventos.length;
                        barraFill.style.height = `${progreso * 100}%`;
                    }
                }
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.id === 'itinerario-section') {
                        animarBarraTiempo();
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        window.addEventListener('scroll', animarBarraTiempo);
        window.addEventListener('load', animarBarraTiempo);
    }

    inicializarNavegacion() {
        const tarjeta = document.querySelector('.fondo1.section1');
        if (tarjeta) {
            tarjeta.style.cursor = 'pointer';
            tarjeta.addEventListener('click', () => {
                const siguienteSection = tarjeta.nextElementSibling;
                if (siguienteSection) {
                    siguienteSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new BodaDinamica();
});