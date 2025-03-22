import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatCEP, formatDate } from "../utils/utils";
import studentService from "../services/studentService";

function StudentForm({ onClose, onStudentServiceCompletedAction, studentToEdit }) {
    const {register, handleSubmit, setValue, formState: { errors }, reset} = useForm({
        defaultValues: studentToEdit || {}
    });
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (studentToEdit) {
            setValue('name', studentToEdit.name);
            setValue('birthdate', formatDate(studentToEdit.birthDate));
            setValue('zipCode', formatCEP(studentToEdit.zipCode));
            setValue('address', studentToEdit.address);
            setValue('cpf', studentToEdit.cpf);
            setValue('userId', studentToEdit.userId);
        }
    }, [studentToEdit, setValue]);

    const onSubmit = async (data) => {
        if (loading) return;
        setLoading(true);

        try {
            const zipCodeCleaned = data.zipCode.replace(/\D/g, '');
            const cpfCleaned = data.cpf.replace(/\D/g, '');

            const student = {
                name: data.name,
                birthDate: data.birthdate,
                zipCode: zipCodeCleaned,
                address: data.address,
                cpf: cpfCleaned,
                userId: data.userId
            };

            let responseData;
            if (studentToEdit) {
                responseData = await studentService.update(studentToEdit.id, student);
            } else {
                // Create student
            }

            onStudentServiceCompletedAction();
            onClose();
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Erro ao salvar aluno.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };
}

export default StudentForm;