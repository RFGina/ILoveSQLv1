const BASE_URL = "http://127.0.0.1:8000/api";

export const getContenidoBySeccion = async (seccionNombre) => {
    try {
        const response = await fetch(`${BASE_URL}/contenido/?seccion=${seccionNombre}`);

        if (!response.ok) throw new Error("Error en la conexión");
        const data = await response.json();

        return data.map(item => ({
            title: item.titulo,
            content: item.contenido
        }));
    } catch (error) {
        console.error(`Error buscando ${seccionNombre}:`, error);
        return [];
    }
};