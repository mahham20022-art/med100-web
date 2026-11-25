// Dumps the curriculum + questions as JSON for the review-pack builder.
import { CURRICULUM } from '../../js/data/curriculum.js';
import { QUESTIONS_BY_TOPIC } from '../../js/data/questions.js';
const days = CURRICULUM.filter((d) => !d.comingSoon).map((d) => ({ ...d, questions: QUESTIONS_BY_TOPIC[d.topicId] || [] }));
process.stdout.write(JSON.stringify(days));
