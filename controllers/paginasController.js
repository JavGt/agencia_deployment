import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
	// Consultar 3 viajes del model Viaje
	const promiseDB = [];
	promiseDB.push(Viaje.findAll({ limit: 3 }));
	promiseDB.push(Testimonial.findAll({ limit: 3 }));

	try {
		const resultado = await Promise.all(promiseDB);

		res.render("inicio", {
			titulo: "Inicio",
			clase: "home",
			viajes: resultado[0],
			testimoniales: resultado[1],
		});
	} catch (error) {
		console.log(error);
	}
};

const paginaNosotros = (req, res) => {
	res.render("nosotros", {
		titulo: "Nosotros",
	});
};

const paginaViajes = async (req, res) => {
	// Consultar Base de datos
	const viajes = await Viaje.findAll();

	res.render("viajes", {
		titulo: "Próximos Viajes",
		viajes,
	});
};

const paginaTestimoniales = async (req, res) => {
	try {
		const testimoniales = await Testimonial.findAll();

		res.render("testimoniales", {
			titulo: "Testimoniales",
			testimoniales,
		});
	} catch (error) {
		console.log(error);
	}
};

//
const paginaDetalleViaje = async (req, res) => {
	const { slug } = req.params;

	try {
		const viaje = await Viaje.findOne({ where: { slug } });

		res.render("viaje", {
			titulo: "Información Viaje",
			viaje,
		});
	} catch (error) {
		console.log(error);
	}
};

export {
	paginaInicio,
	paginaNosotros,
	paginaViajes,
	paginaTestimoniales,
	paginaDetalleViaje,
};
