
// Available languages
export type Language = 'en' | 'hi' | 'fr' | 'es';

// Language names for display
export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  fr: 'Français',
  es: 'Español',
};

// All translations
export interface Translations {
  welcomeMessage: string;
  inputPlaceholder: string;
  typingIndicator: string;
  admissionResponse: string;
  courseResponse: string;
  facultyResponse: string;
  hostelResponse: string;
  defaultResponse: string;
  errorResponse: string;
  fallbackResponse: string;
}

// Translation data for all supported languages
export const translations: Record<Language, Translations> = {
  en: {
    welcomeMessage: 'Hello! I am IITBUDDY, your virtual assistant for IIT ISM Dhanbad. How can I help you today?',
    inputPlaceholder: 'Type your message here...',
    typingIndicator: 'typing...',
    admissionResponse: 'For admission inquiries, please visit the Admissions section on our website or contact the Admissions Office at admissions@iitism.ac.in',
    courseResponse: 'IIT ISM Dhanbad offers various undergraduate, postgraduate, and doctoral programs across multiple disciplines. You can find detailed information on our Academics page.',
    facultyResponse: 'Our institute has distinguished faculty members across various departments. You can find their profiles on the respective department pages.',
    hostelResponse: 'IIT ISM Dhanbad provides hostel facilities for students. For specific queries about accommodation, please contact the Hostel Administration Office.',
    defaultResponse: 'Thank you for your message. As a demo chatbot, I have limited responses. When connected to the database and LLM, I will be able to provide more accurate and helpful information about IIT ISM Dhanbad.',
    errorResponse: 'I apologize, but I encountered an error while searching for information. Please try again or rephrase your question.',
    fallbackResponse: 'I don\'t have specific information about that in my database. Is there something else I can help you with?'
  },
  hi: {
    welcomeMessage: 'नमस्ते! मैं IITBUDDY हूं, IIT ISM धनबाद के लिए आपका आभासी सहायक। आज मैं आपकी कैसे मदद कर सकता हूं?',
    inputPlaceholder: 'अपना संदेश यहां लिखें...',
    typingIndicator: 'टाइप कर रहा है...',
    admissionResponse: 'प्रवेश संबंधी जानकारी के लिए, कृपया हमारी वेबसाइट के प्रवेश अनुभाग पर जाएं या प्रवेश कार्यालय से admissions@iitism.ac.in पर संपर्क करें',
    courseResponse: 'IIT ISM धनबाद विभिन्न विषयों में स्नातक, स्नातकोत्तर और डॉक्टरेट कार्यक्रम प्रदान करता है। आप हमारे अकादमिक पृष्ठ पर विस्तृत जानकारी पा सकते हैं।',
    facultyResponse: 'हमारे संस्थान में विभिन्न विभागों में प्रतिष्ठित संकाय सदस्य हैं। आप उनकी प्रोफाइल संबंधित विभाग के पेज पर पा सकते हैं।',
    hostelResponse: 'IIT ISM धनबाद छात्रों के लिए छात्रावास सुविधाएँ प्रदान करता है। आवास के बारे में विशिष्ट प्रश्नों के लिए, कृपया छात्रावास प्रशासन कार्यालय से संपर्क करें।',
    defaultResponse: 'आपके संदेश के लिए धन्यवाद। एक डेमो चैटबोट के रूप में, मेरे पास सीमित प्रतिक्रियाएं हैं। डेटाबेस और LLM से कनेक्ट होने पर, मैं IIT ISM धनबाद के बारे में अधिक सटीक और सहायक जानकारी प्रदान करने में सक्षम होऊंगा।',
    errorResponse: 'मैं क्षमा चाहता हूं, लेकिन जानकारी खोजते समय मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें या अपना प्रश्न दोबारा लिखें।',
    fallbackResponse: 'मेरे डेटाबेस में इस बारे में विशिष्ट जानकारी नहीं है। क्या कुछ और है जिसमें मैं आपकी सहायता कर सकता हूं?'
  },
  fr: {
    welcomeMessage: 'Bonjour ! Je suis IITBUDDY, votre assistant virtuel pour IIT ISM Dhanbad. Comment puis-je vous aider aujourd\'hui ?',
    inputPlaceholder: 'Tapez votre message ici...',
    typingIndicator: 'en train d\'écrire...',
    admissionResponse: 'Pour les demandes d\'admission, veuillez consulter la section Admissions sur notre site Web ou contacter le Bureau des admissions à admissions@iitism.ac.in',
    courseResponse: 'IIT ISM Dhanbad propose divers programmes de premier cycle, de troisième cycle et de doctorat dans plusieurs disciplines. Vous pouvez trouver des informations détaillées sur notre page Académique.',
    facultyResponse: 'Notre institut compte des membres du corps enseignant distingués dans divers départements. Vous pouvez trouver leurs profils sur les pages des départements respectifs.',
    hostelResponse: 'IIT ISM Dhanbad fournit des installations d\'auberge pour les étudiants. Pour des questions spécifiques sur l\'hébergement, veuillez contacter le Bureau d\'administration des auberges.',
    defaultResponse: 'Merci pour votre message. En tant que chatbot de démonstration, j\'ai des réponses limitées. Une fois connecté à la base de données et au LLM, je serai en mesure de fournir des informations plus précises et utiles sur IIT ISM Dhanbad.',
    errorResponse: 'Je m\'excuse, mais j\'ai rencontré une erreur lors de la recherche d\'informations. Veuillez réessayer ou reformuler votre question.',
    fallbackResponse: 'Je n\'ai pas d\'informations spécifiques à ce sujet dans ma base de données. Y a-t-il autre chose que je puisse faire pour vous aider ?'
  },
  es: {
    welcomeMessage: '¡Hola! Soy IITBUDDY, tu asistente virtual para IIT ISM Dhanbad. ¿Cómo puedo ayudarte hoy?',
    inputPlaceholder: 'Escribe tu mensaje aquí...',
    typingIndicator: 'escribiendo...',
    admissionResponse: 'Para consultas de admisión, visite la sección de Admisiones en nuestro sitio web o comuníquese con la Oficina de Admisiones en admissions@iitism.ac.in',
    courseResponse: 'IIT ISM Dhanbad ofrece varios programas de pregrado, posgrado y doctorado en múltiples disciplinas. Puede encontrar información detallada en nuestra página Académica.',
    facultyResponse: 'Nuestro instituto cuenta con distinguidos miembros de la facultad en varios departamentos. Puede encontrar sus perfiles en las páginas de los departamentos respectivos.',
    hostelResponse: 'IIT ISM Dhanbad proporciona instalaciones de albergue para estudiantes. Para consultas específicas sobre alojamiento, comuníquese con la Oficina de Administración de Albergues.',
    defaultResponse: 'Gracias por su mensaje. Como chatbot de demostración, tengo respuestas limitadas. Cuando esté conectado a la base de datos y LLM, podré proporcionar información más precisa y útil sobre IIT ISM Dhanbad.',
    errorResponse: 'Me disculpo, pero encontré un error al buscar información. Por favor, inténtelo de nuevo o reformule su pregunta.',
    fallbackResponse: 'No tengo información específica sobre eso en mi base de datos. ¿Hay algo más en lo que pueda ayudarte?'
  }
};

// Function to get translations for the current language
export const getTranslations = (language: Language): Translations => {
  return translations[language];
};

// Default language
export const defaultLanguage: Language = 'en';

// Get browser language if possible
export const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  return (browserLang as Language) in translations ? (browserLang as Language) : defaultLanguage;
};

// Language storage key
export const LANGUAGE_STORAGE_KEY = 'iit_buddy_language';

// Get stored language or browser default
export const getInitialLanguage = (): Language => {
  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
  return storedLang && translations[storedLang] ? storedLang : getBrowserLanguage();
};

// Save language preference
export const saveLanguagePreference = (language: Language): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};
