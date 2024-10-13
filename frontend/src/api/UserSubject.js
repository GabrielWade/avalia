import axios from "axios";

export const getSubjects = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/exams/user_subject/', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data.subjects;
    } catch (error) {
        console.error('Erro ao buscar matérias:', error);
        return [];
    }
};
