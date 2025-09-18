import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import supabaseClient from "../lib/supabaseClient";

interface CreateTaskFormData {
	title: string;
	description: string;
	category: string;
	date: string;
	time: string;
	isImportant: boolean;
}

function Create() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<CreateTaskFormData>();
	const navigate = useNavigate();

	const onSubmit = async (dataForm: CreateTaskFormData) => {
		const {
			data: { user },
		} = await supabaseClient.auth.getUser();

		if (!user) {
			console.log(`No se pudo autenticar el usuario.`);
			return;
		}

		const formatDate = new Date(
			`${dataForm.date}T${dataForm.time}`
		).toISOString();

		const { error } = await supabaseClient.from("todo").insert({
			title: dataForm.title,
			category: dataForm.category,
			date: formatDate,

			is_important: dataForm.isImportant,
			is_completed: false,
			is_deleted: false,

			user_id: user.id,
			description: dataForm.description,
		});

		if (error) {
			console.log(`Error al crear la tarea: ${error.message}.`);
			return;
		}

		navigate("/");
	};

	return (
		<section className="flex-1 flex flex-col">
			<header className="grid place-content-center h-[calc(100dvh*1/4)] w-full relative shrink-0 overflow-hidden">
				<div className="md:hidden absolute top-[-60%] left-1/2 -translate-x-1/2 transform bg-[#003391] w-[150vw] h-[40vh] rounded-b-[60%]"></div>

				<div className="flex flex-col gap-4 justify-center items-center z-1">
					<h1 className="md:text-[#003391] text-white  text-2xl md:text-[clamp(0.5rem,3dvw,2rem)] font-bold">
						Nueva tarea
					</h1>
					<p className="md:text-[rgba(0,51,145,0.8)] text-[rgba(255,255,255,0.8)] md:max-w-[40dvw] max-w-[50dvw] text-[1rem] md:text-[clamp(0.5rem,2.5dvw,1.5rem)] text-center">
						Puedes crear tareas para que tu día a día sea mas
						organizado!
					</p>
				</div>
			</header>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col border-0 items-center gap-4 p-4"
			>
				<input
					type="text"
					placeholder="Título"
					className="input h-auto p-4 border-0 border-t border-t-gray-200 w-full rounded-2xl shadow-lg"
					{...register("title", {
						required: {
							value: true,
							message: "El título es obligatorio.",
						},
						maxLength: {
							value: 50,
							message:
								"El título no puede exceder los 50 caracteres.",
						},
						minLength: {
							value: 3,
							message:
								"El título debe tener al menos 3 caracteres.",
						},
						pattern: {
							value: /^[a-zA-Z0-9\s]+$/,
							message:
								"El título solo puede contener letras, números y espacios.",
						},
					})}
				/>

				<textarea
					className="textarea min-h-[calc(3rem)] border-0 border-t border-t-gray-200 w-full rounded-2xl shadow-lg"
					placeholder="Añade una descripción"
					{...register("description", {
						required: {
							value: true,
							message: "La descripción es obligatoria.",
						},
					})}
				></textarea>

				<input
					type="text"
					className="input h-auto border-0 p-4 border-t border-t-gray-200 w-full rounded-2xl shadow-lg"
					placeholder="Categoria"
					list="categories"
					{...register("category", {
						required: {
							value: true,
							message: "La categoría es obligatoria.",
						},
					})}
				/>

				<datalist id="categories">
					<option value="Trabajo"></option>
					<option value="Tarea"></option>
				</datalist>

				<input
					type="date"
					className="bg-white p-4 w-full rounded-2xl border-0 border-t border-t-gray-200 shadow-lg"
					{...register("date", {
						required: {
							value: true,
							message: "La fecha es obligatoria.",
						},
						validate: (value) => {
							const selectedDate = new Date(`${value}T00:00:00`);
							const today = new Date();
							today.setHours(0, 0, 0, 0);
							return (
								selectedDate >= today ||
								"No puedes seleccionar una fecha pasada."
							);
						},
					})}
				/>

				<input
					type="time"
					className="bg-white p-4 w-full rounded-2xl border-0 border-t border-t-gray-200 shadow-lg"
					{...register("time", {
						required: {
							value: true,
							message: "La hora es obligatoria.",
						},
					})}
				/>

				<div className="flex flex-row border-t border-t-gray-200 bg-white justify-between p-4 w-full rounded-2xl shadow-lg">
					<label htmlFor="importantCheckbox" className="label flex-1">
						Importante
					</label>
					<input
						id="importantCheckbox"
						type="checkbox"
						className="checkbox"
						{...register("isImportant")}
					/>
				</div>

				<button
					type="submit"
					className="btn text-white w-1/3 bg-[#003391] rounded-2xl transform hover:scale-[110%] hover:shadow-2xl shadow-lg"
					disabled={isSubmitting}
				>
					Crear
				</button>
			</form>
		</section>
	);
}

export default Create;
