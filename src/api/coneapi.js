const BASE_URL = "https://georgina.pythonanywhere.com/api";

export const getContenidoBySeccion = async (seccionNombre) => {
    try {
        const response = await fetch(`${BASE_URL}/contenido/?seccion=${seccionNombre}`);

        if (!response.ok) throw new Error("Error en la conexión");
        const data = await response.json();

        return data.map(item => ({
            id: item.id,
            title: item.titulo,
            content: item.contenido
        }));
    } catch (error) {
        console.error(`Error buscando ${seccionNombre}:`, error);
        return [];
    }
};