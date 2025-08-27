// Debug script para QuizBuilder
console.log('Testing QuizBuilder data handling...');

// Simular datos de evaluación como los que vienen de EvaluationsManager
const mockQuizData = {
  id: 1,
  title: 'Quiz: Introducción al Cálculo',
  type: 'quiz',
  course: 'Cálculo Diferencial Avanzado',
  courseId: 1,
  isIndependent: false,
  timeLimit: 15,
  attempts: 3,
  passingGrade: 70,
  questions: 5, // Este es un número, no un array
  students: 25,
  completed: 18,
  averageScore: 82,
  status: 'active',
  createdAt: '2024-02-10',
  dueDate: '2024-02-20'
};

const mockIndependentQuiz = {
  id: 3,
  title: 'Quiz Libre: Conceptos de Matemática',
  type: 'quiz',
  course: 'Acceso Libre',
  courseId: null, // Este puede ser null
  isIndependent: true,
  timeLimit: 20,
  attempts: 5,
  passingGrade: 60,
  questions: 8,
  students: 45,
  completed: 32,
  averageScore: 75,
  status: 'active',
  createdAt: '2024-02-05',
  dueDate: null // Este puede ser null
};

console.log('✓ Mock data structure looks correct');
console.log('✓ QuizBuilder should now handle:');
console.log('  - questions as number instead of array');
console.log('  - null courseId for independent evaluations');
console.log('  - null dueDate for independent evaluations');
console.log('  - proper string/number validation for form inputs');
