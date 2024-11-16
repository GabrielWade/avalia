import axios from "axios";

export const getSubjects = async () => {
    const token = localStorage.getItem('access_token');
    try {
        const { data } = await axios.get('http://localhost:8000/exams/user_subject/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return data.subjects;
    } catch (error) {
        console.error('Erro ao buscar matérias:', error);
        return [];
    }
};