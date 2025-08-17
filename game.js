// Enhanced Game Data
const gameData = {
  playerProfile: JSON.parse(localStorage.getItem('playerProfile')) || {},
  englishLevel: null,
  selectedCountry: null,
  currentScenario: null,
  gameProgress: 0,
  score: 0,
  currentDialogue: null,
  currentMiniGame: null,

  // Daily Life structure properly organized inside gameData
  dailyLife: {
    usa: {
      days: [
        {
          day: 1,
          title: "First Day in New York",
          challenges: [
            {
              type: "dialogue",
              scenario: "hotel_checkin",
              background: "usa-hotel.jpg",
              dialogues: [
                {
                  speaker: "receptionist",
                  text: "Welcome to the Grand Hotel! Do you have a reservation?",
                  options: [
                    {
                      text: "Yes, under the name {playerName}",
                      points: 10,
                      next: "verify_reservation"
                    },
                    {
                      text: "No, I need room",
                      points: 5,
                      next: "no_reservation"
                    }
                  ]
                }
              ]
            },
            {
              type: "minigame",
              game: "order_food",
              background: "usa-diner.jpg",
              instructions: "Order a typical American breakfast",
              items: [
                { name: "Pancakes", price: "$6.99" },
                { name: "Eggs Benedict", price: "$8.99" }
              ],
              budget: "$10.00"
            }
          ]
        },
        {
          day: 2,
          title: "Exploring the City",
          challenges: [
            {
              type: "dialogue",
              scenario: "ask_directions",
              background: "usa-street.jpg"
            },
            {
              type: "minigame",
              game: "buy_ticket",
              background: "usa-subway.jpg"
            }
          ]
        }
      ]
    },
    uk: {
      days: [
        {
          day: 1,
          title: "First Day in London",
          challenges: [
            {
              type: "dialogue",
              scenario: "pub_conversation",
              background: "uk-pub.jpg"
            }
          ]
        }
      ]
    }
  },

  // Enhanced Test properly organized inside gameData
  enhancedTest: {
    sections: [
      {
        name: "Grammar",
        questions: [
          {
            type: "multiple_choice",
            question: "Select the sentence with correct grammar:",
            options: [
              "She don't like apples.",
              "She doesn't likes apples.",
              "She doesn't like apples.",
              "She not like apples."
            ],
            correct: 2,
            difficulty: "A2"
          }
        ]
      },
      {
        name: "Reading",
        questions: [
          {
            type: "reading_comprehension",
            passage: "The rapid development of technology...",
            questions: [
              {
                question: "What is the main idea of the passage?",
                options: ["...", "...", "..."],
                correct: 1
              }
            ],
            difficulty: "B2"
          }
        ]
      }
    ],
    scoring: {
      A1: { min: 0, max: 20 },
      A2: { min: 21, max: 40 },
      B1: { min: 41, max: 60 },
      B2: { min: 61, max: 80 },
      C1: { min: 81, max: 95 },
      C2: { min: 96, max: 100 }
    }
  },

  // English levels with detailed descriptions
  levels: [
    { 
      name: "A1", 
      minScore: 0, 
      maxScore: 30,
      badge: "assets/badges/beginner.png",
      description: "You're just starting your English learning journey!",
      skills: [
        "Understand basic greetings and introductions",
        "Use simple present tense sentences",
        "Recognize common words and phrases",
        "Ask and answer simple questions"
      ],
      difficulty: "easy"
    },
    { 
      name: "A2", 
      minScore: 31, 
      maxScore: 50,
      badge: "assets/badges/elementary.png",
      description: "You can communicate in simple everyday situations.",
      skills: [
        "Talk about daily routines",
        "Describe people and places simply",
        "Understand basic instructions",
        "Use present and past tenses"
      ],
      difficulty: "easy-medium"
    },
    { 
      name: "B1", 
      minScore: 51, 
      maxScore: 70,
      badge: "assets/badges/intermediate.png",
      description: "You can handle most travel situations and simple conversations.",
      skills: [
        "Express opinions and plans",
        "Understand the main points of clear texts",
        "Describe experiences and events",
        "Use different verb tenses"
      ],
      difficulty: "medium"
    },
    { 
      name: "B2", 
      minScore: 71, 
      maxScore: 85,
      badge: "assets/badges/upper-intermediate.png",
      description: "You can interact with fluency and discuss various topics.",
      skills: [
        "Understand complex texts",
        "Interact with native speakers comfortably",
        "Write detailed texts on various topics",
        "Use English flexibly for social and work purposes"
      ],
      difficulty: "medium-hard"
    },
    { 
      name: "C1", 
      minScore: 86, 
      maxScore: 100,
      badge: "assets/badges/advanced.png",
      description: "You can use English effectively in academic and professional settings.",
      skills: [
        "Understand demanding texts and implicit meaning",
        "Express ideas fluently and precisely",
        "Use language flexibly for social and professional purposes",
        "Write clear, well-structured texts on complex subjects"
      ],
      difficulty: "hard"
    }
  ],
  
  // Countries data with more details
  countries: {
    usa: {
      name: "United States",
      flag: "assets/countries/usa.png",
      background: "assets/backgrounds/usa.jpg",
      scenarios: ["airport", "hotel", "restaurant", "museum"],
      characters: [
        { 
          id: "john", 
          name: "John", 
          avatar: "assets/characters/usa-john.png", 
          role: "Taxi Driver",
          bio: "A friendly New York taxi driver who loves talking to tourists about the city."
        },
        { 
          id: "sarah", 
          name: "Sarah", 
          avatar: "assets/characters/usa-sarah.png", 
          role: "Hotel Receptionist",
          bio: "The helpful hotel receptionist who knows all the best places in town."
        },
        { 
          id: "michael", 
          name: "Michael", 
          avatar: "assets/characters/usa-michael.png", 
          role: "Tour Guide",
          bio: "An enthusiastic tour guide with incredible knowledge of American history."
        }
      ],
      culturalFacts: [
        "Americans often greet with a handshake or casual 'Hi, how are you?'",
        "Tipping 15-20% is expected in restaurants and for services",
        "Personal space is important - stand about an arm's length apart"
      ]
    },
    uk: {
      name: "United Kingdom",
      flag: "assets/countries/uk.png",
      background: "assets/backgrounds/uk.jpg",
      scenarios: ["airport", "pub", "train", "park"],
      characters: [
        { 
          id: "david", 
          name: "David", 
          avatar: "assets/characters/uk-david.png", 
          role: "Pub Owner",
          bio: "A traditional pub owner who enjoys sharing British customs over a pint."
        },
        { 
          id: "emma", 
          name: "Emma", 
          avatar: "assets/characters/uk-emma.png", 
          role: "Ticket Inspector",
          bio: "The no-nonsense but fair ticket inspector on the London Underground."
        },
        { 
          id: "oliver", 
          name: "Oliver", 
          avatar: "assets/characters/uk-oliver.png", 
          role: "Park Guide",
          bio: "A knowledgeable guide who leads tours through London's royal parks."
        }
      ],
      culturalFacts: [
        "British people often use understatement ('It's a bit rainy' during a downpour)",
        "Queueing (standing in line) is taken very seriously",
        "Pubs are central to social life - order drinks at the bar"
      ]
    },
    australia: {
      name: "Australia",
      flag: "assets/countries/australia.png",
      background: "assets/backgrounds/australia.jpg",
      scenarios: ["airport", "beach", "cafe", "wildlife_park"],
      characters: [
        { 
          id: "jack", 
          name: "Jack", 
          avatar: "assets/characters/australia-jack.png", 
          role: "Surf Instructor",
          bio: "A laid-back surf instructor who teaches tourists to ride the waves."
        },
        { 
          id: "chloe", 
          name: "Chloe", 
          avatar: "assets/characters/australia-chloe.png", 
          role: "Barista",
          bio: "The cheerful barista at a Melbourne coffee shop who makes amazing flat whites."
        },
        { 
          id: "liam", 
          name: "Liam", 
          avatar: "assets/characters/australia-liam.png", 
          role: "Wildlife Expert",
          bio: "A passionate wildlife expert who introduces visitors to Australia's unique animals."
        }
      ],
      culturalFacts: [
        "Australians often shorten words ('arvo' for afternoon, 'brekkie' for breakfast)",
        "Coffee culture is strong - know your flat white from your long black",
        "Informality is common - first names are used quickly"
      ]
    },
    canada: {
      name: "Canada",
      flag: "assets/countries/canada.png",
      background: "assets/backgrounds/canada.jpg",
      scenarios: ["airport", "ski_resort", "coffee_shop", "art_gallery"],
      characters: [
        { 
          id: "ethan", 
          name: "Ethan", 
          avatar: "assets/characters/canada-ethan.png", 
          role: "Ski Instructor",
          bio: "An adventurous ski instructor who teaches visitors to navigate the slopes."
        },
        { 
          id: "sophia", 
          name: "Sophia", 
          avatar: "assets/characters/canada-sophia.png", 
          role: "Barista",
          bio: "The friendly barista at a Vancouver coffee shop who loves chatting with customers."
        },
        { 
          id: "lucas", 
          name: "Lucas", 
          avatar: "assets/characters/canada-lucas.png", 
          role: "Art Curator",
          bio: "A knowledgeable art curator who introduces visitors to Canadian artists."
        }
      ],
      culturalFacts: [
        "Canadians are known for politeness - 'sorry' is used frequently",
        "Both English and French are official languages",
        "Tipping 15-20% is customary in restaurants"
      ]
    }
  },

  // Enhanced English test questions with explanations
  testQuestions: [
    {
      question: "What does 'Hello' mean?",
      options: [
        { text: "A greeting", correct: true, explanation: "Correct! 'Hello' is a common greeting in English." },
        { text: "A type of food", correct: false, explanation: "No, 'hello' isn't a food. It's a greeting." },
        { text: "A color", correct: false, explanation: "No, 'hello' isn't a color. It's how you greet someone." },
        { text: "A number", correct: false, explanation: "No, 'hello' isn't a number. It's what you say when you meet someone." }
      ]
    },
    {
      question: "Complete the sentence: I ___ from Brazil.",
      options: [
        { text: "am", correct: true, explanation: "Correct! With 'I' we use 'am' (I am from Brazil)." },
        { text: "is", correct: false, explanation: "Not quite. 'Is' is used with he/she/it (He is from Brazil)." },
        { text: "are", correct: false, explanation: "Close, but 'are' is used with you/we/they (You are from Brazil)." },
        { text: "be", correct: false, explanation: "Not quite. 'Be' is the base form, we need 'am' here." }
      ]
    },
    {
      question: "What is the plural of 'child'?",
      options: [
        { text: "Childs", correct: false, explanation: "Almost! English has some irregular plurals." },
        { text: "Children", correct: true, explanation: "Correct! 'Children' is the irregular plural of 'child'." },
        { text: "Childes", correct: false, explanation: "Not quite. The plural is irregular." },
        { text: "Childen", correct: false, explanation: "Close! Remember it's 'children'." }
      ]
    },
    {
      question: "Which sentence is correct?",
      options: [
        { text: "She go to school", correct: false, explanation: "Almost! With 'she' we need 'goes'." },
        { text: "She goes to school", correct: true, explanation: "Correct! 'She' takes 'goes' in present simple." },
        { text: "She going to school", correct: false, explanation: "This needs 'is' before 'going' for present continuous." },
        { text: "She to go school", correct: false, explanation: "This isn't a correct structure in English." }
      ]
    },
    {
      question: "What is the opposite of 'happy'?",
      options: [
        { text: "Sad", correct: true, explanation: "Correct! The opposite of happy is sad." },
        { text: "Angry", correct: false, explanation: "Angry is a different emotion - the opposite is sad." },
        { text: "Excited", correct: false, explanation: "Excited is actually similar to happy, not opposite." },
        { text: "Tired", correct: false, explanation: "Tired is about energy, not the opposite of happy." }
      ]
    },
    {
      question: "Which is a correct question?",
      options: [
        { text: "Where you live?", correct: false, explanation: "Almost! We need the auxiliary 'do'." },
        { text: "Where do you live?", correct: true, explanation: "Correct! Questions need the auxiliary 'do'." },
        { text: "Where does you live?", correct: false, explanation: "Close, but with 'you' we use 'do', not 'does'." },
        { text: "Where you do live?", correct: false, explanation: "The word order isn't correct here." }
      ]
    },
    {
      question: "What is the past tense of 'eat'?",
      options: [
        { text: "Eated", correct: false, explanation: "Almost! 'Eat' has an irregular past tense." },
        { text: "Ate", correct: true, explanation: "Correct! 'Ate' is the irregular past tense of 'eat'." },
        { text: "Eaten", correct: false, explanation: "'Eaten' is the past participle, not simple past." },
        { text: "Eating", correct: false, explanation: "'Eating' is the present participle." }
      ]
    },
    {
      question: "Which word is a pronoun?",
      options: [
        { text: "Run", correct: false, explanation: "'Run' is a verb, not a pronoun." },
        { text: "Beautiful", correct: false, explanation: "'Beautiful' is an adjective, not a pronoun." },
        { text: "He", correct: true, explanation: "Correct! 'He' is a personal pronoun." },
        { text: "Quickly", correct: false, explanation: "'Quickly' is an adverb, not a pronoun." }
      ]
    },
    {
      question: "What does 'How are you?' mean?",
      options: [
        { text: "What is your name?", correct: false, explanation: "No, that would be 'What's your name?'." },
        { text: "Where are you from?", correct: false, explanation: "That's a different question about origin." },
        { text: "What time is it?", correct: false, explanation: "No, that's asking about the time." },
        { text: "What is your condition?", correct: true, explanation: "Correct! It's asking about your well-being." }
      ]
    },
    {
      question: "Complete: ___ name is Maria.",
      options: [
        { text: "My", correct: true, explanation: "Correct! We use possessive adjectives like 'my' before nouns." },
        { text: "I", correct: false, explanation: "'I' is a subject pronoun, we need a possessive here." },
        { text: "Me", correct: false, explanation: "'Me' is an object pronoun, not possessive." },
        { text: "Mine", correct: false, explanation: "'Mine' is used alone, not before a noun." }
      ]
    }
  ],
  
  // Enhanced dialogue scenarios with cultural context
  scenarios: {
    airport: {
      name: "Airport Arrival",
      background: "airport.jpg",
      dialogues: [
        {
          id: "welcome",
          speaker: "customs_officer",
          text: "Welcome to {country}! May I see your passport please?",
          options: [
            { 
              text: "Yes, here it is.", 
              next: "passport_check", 
              points: 1,
              culturalNote: "Handing over documents promptly is considered polite in most English-speaking countries."
            },
            { 
              text: "What?", 
              next: "repeat_passport", 
              points: 0,
              culturalNote: "If you don't understand, it's better to say 'Could you repeat that, please?'"
            },
            { 
              text: "I don't understand.", 
              next: "confused", 
              points: 0.5,
              culturalNote: "Being honest about not understanding is okay, but try to be more specific about what you need."
            }
          ]
        },
        {
          id: "passport_check",
          speaker: "customs_officer",
          text: "Thank you. How long will you be staying in {country}?",
          options: [
            { 
              text: "Two weeks.", 
              next: "purpose_visit", 
              points: 1,
              culturalNote: "Giving clear, concise answers is appreciated in official situations."
            },
            { 
              text: "I stay two week.", 
              next: "purpose_visit", 
              points: 0.7,
              culturalNote: "The grammar isn't perfect but the meaning is clear - officials will usually understand."
            },
            { 
              text: "No.", 
              next: "confused", 
              points: 0,
              culturalNote: "This doesn't answer the question and may cause confusion."
            }
          ]
        },
        {
          id: "purpose_visit",
          speaker: "customs_officer",
          text: "What is the purpose of your visit?",
          options: [
            { 
              text: "I'm here on vacation.", 
              next: "welcome_end", 
              points: 1,
              culturalNote: "'Vacation' is American English, 'holiday' is British English for the same meaning."
            },
            { 
              text: "Tourism.", 
              next: "welcome_end", 
              points: 0.8,
              culturalNote: "This is correct but a bit brief - more complete sentences are preferred."
            },
            { 
              text: "Work.", 
              next: "work_visit", 
              points: 1,
              culturalNote: "If visiting for work, be prepared to show additional documents."
            }
          ]
        },
        {
          id: "work_visit",
          speaker: "customs_officer",
          text: "Do you have a work visa?",
          options: [
            { 
              text: "Yes, here it is.", 
              next: "welcome_end", 
              points: 1,
              culturalNote: "Always carry important documents when traveling for work."
            },
            { 
              text: "No, I don't.", 
              next: "problem", 
              points: 0,
              culturalNote: "Working without proper authorization can lead to serious problems."
            }
          ]
        },
        {
          id: "repeat_passport",
          speaker: "customs_officer",
          text: "I need to see your passport. Your passport, please?",
          options: [
            { 
              text: "Oh, sorry! Here it is.", 
              next: "passport_check", 
              points: 0.7,
              culturalNote: "Saying 'sorry' for small mistakes is very common in English-speaking cultures."
            },
            { 
              text: "I don't have it.", 
              next: "problem", 
              points: 0,
              culturalNote: "Always keep your passport accessible when going through customs."
            }
          ]
        },
        {
          id: "confused",
          speaker: "customs_officer",
          text: "It seems you're having trouble. Let me get someone who speaks your language.",
          next: "translator",
          points: 0
        },
        {
          id: "translator",
          speaker: "translator",
          text: "Hello! I can help you. The officer needs to see your passport.",
          options: [
            { 
              text: "Thank you! Here is my passport.", 
              next: "passport_check", 
              points: 0.8,
              culturalNote: "Showing gratitude when someone helps you is always appreciated."
            },
            { 
              text: "I don't have my passport with me.", 
              next: "problem", 
              points: 0,
              culturalNote: "Not having your passport at customs will cause significant delays."
            }
          ]
        },
        {
          id: "problem",
          speaker: "customs_officer",
          text: "I'm sorry, but we can't let you enter the country without the proper documents.",
          next: "game_over",
          points: 0
        },
        {
          id: "welcome_end",
          speaker: "customs_officer",
          text: "Thank you. Welcome to {country}! Enjoy your stay.",
          next: "scenario_complete",
          points: 1,
          culturalNote: "Officials often end interactions with a polite welcome or wish."
        },
        {
          id: "scenario_complete",
          speaker: "system",
          text: "Congratulations! You've successfully navigated the airport arrival process. You earned {points} points!",
          action: function() {
            startDailyLife(gameData.selectedCountry);
          },
          points: 0
        },
        {
          id: "game_over",
          speaker: "system",
          text: "Oh no! You couldn't enter the country. Let's try again.",
          next: "welcome",
          points: -5
        },
        {
          id: "mini_game",
          speaker: "system",
          text: "Let's practice what you've learned with a quick activity!",
          next: "mini_game_transition",
          points: 0
        },
        {
          id: "mini_game_transition",
          speaker: "system",
          text: "Get ready for the challenge!",
          next: "mini_game_start",
          points: 0
        },
        {
          id: "mini_game_start",
          speaker: "system",
          text: "",
          next: "mini_game",
          points: 0
        }
      ]
    },
    hotel_checkin: {
      name: "Hotel Check-In",
      background: "hotel.jpg",
      dialogues: [
        {
          id: "start",
          speaker: "receptionist",
          text: "Welcome to {hotelName}! Do you have a reservation?",
          options: [
            {
              text: "Yes, under {playerName}",
              next: "find_reservation",
              points: 10
            },
            {
              text: "No, I need a room",
              next: "no_reservation",
              points: 5
            }
          ]
        }
        // More hotel dialogues...
      ]
    }
    // More scenarios...
  },
  
  // Enhanced mini-games with more variety
  miniGames: {
    word_order: {
      name: "Sentence Builder",
      instructions: "Put the words in the correct order to form a sentence.",
      generate: function(level) {
        const sentences = {
          easy: [
            "Hello my name is {playerName}",
            "I am from {country}",
            "How are you today",
            "Thank you very much",
            "Where is the hotel"
          ],
          medium: [
            "Could you help me please",
            "What time does the museum open",
            "I would like a coffee please",
            "How much does this cost",
            "Do you speak English"
          ],
          hard: [
            "I've been waiting here for twenty minutes",
            "Could you recommend a good restaurant nearby",
            "What's the best way to get to the city center",
            "I'm allergic to peanuts does this contain any",
            "My flight has been delayed what should I do"
          ]
        };
        
        let difficulty = 'easy';
        if (level === 'intermediate' || level === 'upper intermediate') difficulty = 'medium';
        if (level === 'advanced') difficulty = 'hard';
        
        const sentence = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)]
          .replace("{playerName}", gameData.playerProfile.name || "Alex")
          .replace("{country}", gameData.playerProfile.country || "Brazil");
        
        const words = sentence.split(' ');
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        
        return {
          question: "Arrange these words to form a correct sentence:",
          correctAnswer: sentence,
          wordBank: shuffledWords,
          difficulty: difficulty
        };
      },
      checkAnswer: function(userAnswer, correctAnswer) {
        return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
      }
    },
    
    fill_blank: {
      name: "Fill in the Blank",
      instructions: "Choose the correct word to complete the sentence.",
      generate: function(level) {
        const questions = {
          easy: [
            {
              sentence: "I ___ from {country}.",
              options: ["am", "is", "are", "be"],
              correct: 0,
              explanation: "Use 'am' with 'I' in the present simple."
            },
            {
              sentence: "___ name is {playerName}.",
              options: ["My", "I", "Me", "Mine"],
              correct: 0,
              explanation: "'My' is the possessive adjective we use before nouns."
            },
            {
              sentence: "Where ___ you from?",
              options: ["am", "is", "are", "be"],
              correct: 2,
              explanation: "Use 'are' with 'you' in questions and statements."
            }
          ],
          medium: [
            {
              sentence: "She ___ a doctor at the city hospital.",
              options: ["work", "works", "working", "worked"],
              correct: 1,
              explanation: "With 'she', use 'works' in present simple (add -s)."
            },
            {
              sentence: "We ___ going to the park tomorrow.",
              options: ["am", "is", "are", "be"],
              correct: 2,
              explanation: "Use 'are' with 'we' in present continuous."
            },
            {
              sentence: "___ you speak English?",
              options: ["Do", "Does", "Is", "Are"],
              correct: 0,
              explanation: "Use 'do' with 'you' to form present simple questions."
            }
          ],
          hard: [
            {
              sentence: "By this time next year, I ___ graduated from university.",
              options: ["will", "will be", "will have", "would have"],
              correct: 2,
              explanation: "'Will have graduated' is the future perfect tense."
            },
            {
              sentence: "If I ___ you, I would accept that job offer.",
              options: ["am", "was", "were", "would be"],
              correct: 2,
              explanation: "In hypothetical situations, we use 'were' for all subjects."
            },
            {
              sentence: "The project ___ by the team before the deadline.",
              options: ["completed", "was completed", "has completed", "had completed"],
              correct: 1,
              explanation: "This is passive voice (was completed) showing the action was done to the project."
            }
          ]
        };
        
        let difficulty = 'easy';
        if (level === 'intermediate' || level === 'upper intermediate') difficulty = 'medium';
        if (level === 'advanced') difficulty = 'hard';
        
        const questionSet = questions[difficulty];
        const question = questionSet[Math.floor(Math.random() * questionSet.length)];
        
        const processedSentence = question.sentence
          .replace("{playerName}", gameData.playerProfile.name || "Alex")
          .replace("{country}", gameData.playerProfile.country || "Brazil");
        
        return {
          question: processedSentence,
          options: question.options,
          correctAnswer: question.correct,
          explanation: question.explanation,
          difficulty: difficulty
        };
      }
    },
    
    correct_mistake: {
      name: "Find the Mistake",
      instructions: "Identify and correct the mistake in the sentence.",
      generate: function(level) {
        const questions = {
          easy: [
            {
              sentence: "She go to school every day.",
              correction: "She goes to school every day.",
              explanation: "With 'she', we need to add -s to the verb: 'goes'."
            },
            {
              sentence: "I am liking ice cream.",
              correction: "I like ice cream.",
              explanation: "'Like' is a stative verb - we don't usually use it in continuous forms."
            },
            {
              sentence: "Where you live?",
              correction: "Where do you live?",
              explanation: "Questions in present simple need the auxiliary 'do'."
            }
          ],
          medium: [
            {
              sentence: "He can to swim very well.",
              correction: "He can swim very well.",
              explanation: "After modal verbs like 'can', we use the base form without 'to'."
            },
            {
              sentence: "They is my friends.",
              correction: "They are my friends.",
              explanation: "'They' is plural, so we need 'are' not 'is'."
            },
            {
              sentence: "What your name?",
              correction: "What is your name?",
              explanation: "We need the verb 'is' to make a complete question."
            }
          ],
          hard: [
            {
              sentence: "I have seen him yesterday.",
              correction: "I saw him yesterday.",
              explanation: "With specific past times like 'yesterday', use simple past not present perfect."
            },
            {
              sentence: "She's used to wake up early.",
              correction: "She's used to waking up early.",
              explanation: "'Be used to' is followed by a noun or -ing form, not base verb."
            },
            {
              sentence: "The room was cleaning when I arrived.",
              correction: "The room was being cleaned when I arrived.",
              explanation: "This should be passive voice (was being cleaned) as the room didn't clean itself."
            }
          ]
        };
        
        let difficulty = 'easy';
        if (level === 'intermediate' || level === 'upper intermediate') difficulty = 'medium';
        if (level === 'advanced') difficulty = 'hard';
        
        const questionSet = questions[difficulty];
        const question = questionSet[Math.floor(Math.random() * questionSet.length)];
        
        return {
          question: "Find and correct the mistake in this sentence:",
          sentence: question.sentence,
          correctAnswer: question.correction,
          explanation: question.explanation,
          difficulty: difficulty
        };
      }
    },
    
    cultural_quiz: {
      name: "Cultural Knowledge",
      instructions: "Answer the question about {country} culture.",
      generate: function(level) {
        const country = gameData.selectedCountry;
        const countryData = gameData.countries[country];
        
        const questions = [
          {
            question: `In ${countryData.name}, what is a common greeting?`,
            options: [
              "A handshake and smile",
              "A kiss on both cheeks",
              "A bow",
              "A high five"
            ],
            correct: 0,
            explanation: `In ${countryData.name}, a handshake with a smile is the most common formal greeting.`
          },
          {
            question: `What is considered polite when dining in ${countryData.name}?`,
            options: [
              "Keeping your hands on the table",
              "Saying 'please' and 'thank you'",
              "Eating quickly",
              "Talking with food in your mouth"
            ],
            correct: 1,
            explanation: `In ${countryData.name}, as in most English-speaking countries, saying 'please' and 'thank you' is very important.`
          },
          {
            question: `What might be a good topic for small talk in ${countryData.name}?`,
            options: [
              "The weather",
              "Personal salary",
              "Someone's weight",
              "Political debates"
            ],
            correct: 0,
            explanation: `In ${countryData.name}, the weather is always a safe small talk topic. Personal topics should be avoided.`
          }
        ];
        
        const question = questions[Math.floor(Math.random() * questions.length)];
        
        return {
          question: question.question,
          options: question.options,
          correctAnswer: question.correct,
          explanation: question.explanation,
          difficulty: "medium"
        };
      }
    },
    
    order_food: {
      name: "Order Food",
      instructions: "Select items to order within your budget.",
      generate: function() {
        const country = gameData.selectedCountry;
        const countryData = gameData.countries[country];
        const scenario = gameData.scenarios.hotel_checkin;
        
        return {
          items: [
            { name: "Pancakes", price: 6.99 },
            { name: "Eggs Benedict", price: 8.99 },
            { name: "Orange Juice", price: 3.50 },
            { name: "Coffee", price: 2.99 }
          ],
          budget: 15.00,
          background: scenario.background
        };
      },
      checkAnswer: function(selectedItems, gameData) {
        const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
        return total <= gameData.budget;
      }
    }
  },

  // Feedback messages
  feedback: {
    positive: [
      "Great job! You're doing amazing!",
      "Perfect! You really understand this!",
      "Excellent! Your English is improving!",
      "Correct! You're learning quickly!",
      "Well done! Keep up the good work!"
    ],
    negative: [
      "Almost! Let's try again.",
      "Not quite, but you're getting there!",
      "Good try! Here's the correct answer.",
      "Don't worry! Mistakes help us learn.",
      "You'll get it next time! Here's how it should be:"
    ]
  }
};

// DOM Elements
const elements = {
  screens: {
    loading: document.getElementById('loading-screen'),
    knowledgeCheck: document.getElementById('knowledge-check'),
    levelTest: document.getElementById('level-test'),
    levelResult: document.getElementById('level-result'),
    countrySelection: document.getElementById('country-selection'),
    gameScreen: document.getElementById('game-screen'),
    miniGameScreen: document.getElementById('mini-game-screen'),
    certificateScreen: document.getElementById('certificate-screen'),
    transitionScreen: document.getElementById('transition-screen') // Adicione esta linha
  },
  
  // Knowledge check
  knowNothingBtn: document.getElementById('know-nothing'),
  knowSomethingBtn: document.getElementById('know-something'),
  
  // Level test
  testQuestionEl: document.querySelector('.test-question'),
  testOptionsEl: document.querySelector('.test-options'),
  nextQuestionBtn: document.getElementById('next-question'),
  testProgressFill: document.querySelector('.progress-fill'),
  testProgressText: document.querySelector('.progress-text'),
  currentQuestionEl: document.querySelector('.progress-text .current'),
  totalQuestionsEl: document.querySelector('.progress-text .total'),
  testFeedbackEl: document.querySelector('.test-feedback'),
  feedbackIconEl: document.querySelector('.feedback-icon'),
  feedbackTextEl: document.querySelector('.feedback-text'),
  
  // Level result
  levelBadgeEl: document.getElementById('level-badge'),
  levelTitleEl: document.getElementById('level-title'),
  levelDescriptionEl: document.getElementById('level-description'),
  skillsListEl: document.getElementById('skills-list'),
  continueToCountriesBtn: document.getElementById('continue-to-countries'),
  
  // Country selection
  countryOptions: document.querySelectorAll('.country-option'),
  
  // Game screen
  gameBackgroundEl: document.getElementById('game-background'),
  playerAvatar: document.getElementById('player-avatar'),
  playerNameEl: document.getElementById('player-name'),
  playerLevelEl: document.getElementById('player-level'),
  npcAvatar: document.getElementById('npc-avatar'),
  npcNameEl: document.getElementById('npc-name'),
  dialogueContent: document.getElementById('dialogue-content'),
  dialogueOptions: document.getElementById('dialogue-options'),
  
  // Mini-game screen
  miniGameBackgroundEl: document.getElementById('mini-game-background'),
  miniGameTitleEl: document.getElementById('mini-game-title'),
  miniGameInstructionsEl: document.getElementById('mini-game-instructions'),
  miniGameContentEl: document.getElementById('mini-game-content'),
  miniGameFeedbackEl: document.querySelector('.mini-game-feedback'),
  miniGameFeedbackIconEl: document.querySelector('.mini-game-feedback .feedback-icon'),
  miniGameFeedbackTextEl: document.querySelector('.mini-game-feedback .feedback-text'),
  submitAnswerBtn: document.getElementById('submit-answer'),
  
  // Certificate screen
  certificateNameEl: document.getElementById('certificate-name'),
  certificateFlagEl: document.getElementById('certificate-flag'),
  certificateCountryEl: document.getElementById('certificate-country'),
  certificateLevelEl: document.getElementById('certificate-level'),
  certificateDateEl: document.getElementById('certificate-date'),
  certificateKnowledgeEl: document.getElementById('certificate-knowledge'),
  characterSignatureImgEl: document.getElementById('character-signature-img'),
  characterSignatureNameEl: document.getElementById('character-signature-name'),
  restartGameBtn: document.getElementById('restart-game'),
  shareCertificateBtn: document.getElementById('share-certificate'),
  
  // Audio
  backgroundMusic: document.getElementById('background-music'),
  clickSound: document.getElementById('click-sound'),
  successSound: document.getElementById('success-sound'),
  failureSound: document.getElementById('failure-sound'),
  transitionSound: document.getElementById('transition-sound'),
  dialogueSound: document.getElementById('dialogue-sound'),
  celebrationSound: document.getElementById('celebration-sound')
};


// --- Game State ---
let state = {
  currentScreen: 'loading',
  selectedCountry: null,
  currentDay: 0,
  currentChallenge: 0,
  isTransitioning: false,
  visitedCountries: JSON.parse(localStorage.getItem('visitedCountries')) || [],
  playerProfile: gameData.playerProfile || {},
  englishLevel: null,
  testScore: 0,
  testAnswers: [],
  countryProgress: {}, // { usa: { day: 1, completed: false }, ... }
  achievements: [],
  badges: [],
  scenarioPoints: 0,
  scenarioHistory: [],
  miniGameResult: null
};

// --- Utility Functions ---
function saveProgress() {
  localStorage.setItem('visitedCountries', JSON.stringify(state.visitedCountries));
  localStorage.setItem('playerProfile', JSON.stringify(state.playerProfile));
}

function showScreen(screenName) {
  Object.values(elements.screens).forEach(s => s.classList.remove('active'));
  if (elements.screens[screenName]) elements.screens[screenName].classList.add('active');
  state.currentScreen = screenName;
}

// --- Country Selection & Progress ---
function updateCountrySelectionScreen() {
  elements.countryOptions.forEach(opt => {
    const cid = opt.getAttribute('data-country');
    if (state.visitedCountries.includes(cid)) {
      opt.classList.add('locked');
      if (!opt.querySelector('.country-completed-badge')) {
        const badge = document.createElement('div');
        badge.className = 'country-completed-badge';
        badge.innerHTML = '✔️ Visited';
        opt.querySelector('.country-card').appendChild(badge);
      }
    } else {
      opt.classList.remove('locked');
      const badge = opt.querySelector('.country-completed-badge');
      if (badge) badge.remove();
    }
  });
}

function selectCountry(countryId) {
  if (state.visitedCountries.includes(countryId)) return;
  state.selectedCountry = countryId;
  state.currentDay = 0;
  state.currentChallenge = 0;
  state.isTransitioning = true;
  showTransitionScreen(countryId);
}

function showTransitionScreen(countryId) {
  const country = gameData.countries[countryId];
  elements.screens.transitionScreen.querySelector('#destination-country').textContent = country.name;
  showScreen('transitionScreen');
  elements.transitionSound && elements.transitionSound.play();
  setTimeout(() => {
    state.isTransitioning = false;
    startCountryAdventure();
  }, 3000);
}

function startCountryAdventure() {
  showScreen('gameScreen');
  showCurrentDay();
}

function showCurrentDay() {
  const countryObj = gameData.dailyLife[state.selectedCountry];
  if (!countryObj) return;
  const dayObj = countryObj.days[state.currentDay];
  if (!dayObj) {
    finishCountry();
    return;
  }
  // Atualiza fundo e título
  elements.gameBackgroundEl.style.backgroundImage = `url('assets/backgrounds/${dayObj.challenges[0].background || 'default.jpg'}')`;
  showChallenge();
}

function showChallenge() {
  const countryObj = gameData.dailyLife[state.selectedCountry];
  const dayObj = countryObj.days[state.currentDay];
  const challenge = dayObj.challenges[state.currentChallenge];
  if (!challenge) {
    // Avança para o próximo dia
    state.currentDay++;
    state.currentChallenge = 0;
    showCurrentDay();
    return;
  }
  if (challenge.type === 'dialogue') {
    showDialogue(challenge);
  } else if (challenge.type === 'minigame') {
    showMiniGame(challenge);
  } else {
    nextChallenge();
  }
}

function nextChallenge() {
  state.currentChallenge++;
  showChallenge();
}

function finishCountry() {
  if (!state.visitedCountries.includes(state.selectedCountry)) {
    state.visitedCountries.push(state.selectedCountry);
    saveProgress();
  }
  updateCountrySelectionScreen();
  showScreen('countrySelection');
  // Cerimônia se todos concluídos
  if (Object.keys(gameData.countries).every(cid => state.visitedCountries.includes(cid))) {
    showCeremony();
  }
}

function showCeremony() {
  showScreen('certificateScreen');
  // Preencher dados do certificado
  elements.certificateNameEl.textContent = state.playerProfile.name || 'Player';
  elements.certificateLevelEl.textContent = state.englishLevel || 'N/A';
  elements.certificateDateEl.textContent = new Date().toLocaleDateString();
  elements.certificateKnowledgeEl.textContent = state.visitedCountries.length + ' countries';
  // ...preencher flag, país, assinatura, etc.
}

// --- Diálogo ---
function showDialogue(challenge) {
  // Exemplo: exibe diálogo inicial
  const scenario = gameData.scenarios[challenge.scenario];
  if (!scenario) return nextChallenge();
  let dialogueIndex = 0;
  function renderDialogue() {
    const dialogue = scenario.dialogues[dialogueIndex];
    if (!dialogue) return nextChallenge();
    elements.dialogueContent.innerHTML = dialogue.text.replace('{country}', gameData.countries[state.selectedCountry].name).replace('{playerName}', state.playerProfile.name || 'Player');
    elements.dialogueOptions.innerHTML = '';
    if (dialogue.options) {
      dialogue.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'dialogue-option btn-primary';
        btn.textContent = opt.text.replace('{playerName}', state.playerProfile.name || 'Player');
        btn.onclick = () => {
          state.scenarioPoints += opt.points || 0;
          if (opt.culturalNote) {
            showFeedback(opt.culturalNote, true);
          }
          if (opt.next) {
            dialogueIndex = scenario.dialogues.findIndex(d => d.id === opt.next);
            renderDialogue();
          } else {
            nextChallenge();
          }
        };
        elements.dialogueOptions.appendChild(btn);
      });
    } else if (dialogue.next) {
      dialogueIndex = scenario.dialogues.findIndex(d => d.id === dialogue.next);
      setTimeout(renderDialogue, 1200);
    } else {
      nextChallenge();
    }
  }
  renderDialogue();
}

function showFeedback(text, positive) {
  elements.testFeedbackEl.classList.remove('hidden');
  elements.feedbackIconEl.className = 'feedback-icon ' + (positive ? 'correct' : 'incorrect');
  elements.feedbackTextEl.textContent = text;
  setTimeout(() => {
    elements.testFeedbackEl.classList.add('hidden');
  }, 2000);
}

// --- Mini-games ---
function showMiniGame(challenge) {
  showScreen('miniGameScreen');
  const miniGame = gameData.miniGames[challenge.game];
  if (!miniGame) return nextChallenge();
  elements.miniGameTitleEl.textContent = miniGame.name;
  elements.miniGameInstructionsEl.textContent = miniGame.instructions;
  // Exemplo: gerar conteúdo do mini-game
  elements.miniGameContentEl.innerHTML = '<div>Mini-game coming soon!</div>';
  // Simula resposta e volta
  setTimeout(() => {
    showScreen('gameScreen');
    nextChallenge();
  }, 2000);
}

// --- Teste de Nível de Inglês ---
function startLevelTest() {
  state.testScore = 0;
  state.testAnswers = [];
  state.currentTestQuestion = 0;
  showScreen('levelTest');
  renderTestQuestion();
}

function renderTestQuestion() {
  const q = gameData.testQuestions[state.currentTestQuestion];
  if (!q) {
    finishLevelTest();
    return;
  }
  elements.testQuestionEl.textContent = q.question;
  elements.testOptionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'test-option';
    btn.textContent = opt.text;
    btn.onclick = () => {
      state.testAnswers.push({ question: q.question, answer: opt.text, correct: opt.correct });
      if (opt.correct) {
        state.testScore += 10;
        showTestFeedback(opt.explanation, true);
      } else {
        showTestFeedback(opt.explanation, false);
      }
      setTimeout(() => {
        state.currentTestQuestion++;
        renderTestQuestion();
      }, 1200);
    };
    elements.testOptionsEl.appendChild(btn);
  });
  elements.currentQuestionEl.textContent = state.currentTestQuestion + 1;
  elements.totalQuestionsEl.textContent = gameData.testQuestions.length;
  elements.testProgressFill.style.width = ((state.currentTestQuestion + 1) / gameData.testQuestions.length * 100) + '%';
}

function showTestFeedback(text, positive) {
  elements.testFeedbackEl.classList.remove('hidden');
  elements.feedbackIconEl.className = 'feedback-icon ' + (positive ? 'correct' : 'incorrect');
  elements.feedbackTextEl.textContent = text;
  setTimeout(() => {
    elements.testFeedbackEl.classList.add('hidden');
  }, 1200);
}

function finishLevelTest() {
  // Avalia nível
  let level = gameData.levels.find(l => state.testScore >= l.minScore && state.testScore <= l.maxScore);
  state.englishLevel = level ? level.name : 'A1';
  showScreen('levelResult');
  // Preenche resultado
  elements.levelBadgeEl.src = level ? level.badge : '';
  elements.levelTitleEl.textContent = level ? level.name : 'A1';
  elements.levelDescriptionEl.textContent = level ? level.description : '';
  elements.skillsListEl.innerHTML = '';
  (level ? level.skills : []).forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    elements.skillsListEl.appendChild(li);
  });
}

// --- Inicialização e Listeners ---
function setupListeners() {
  elements.knowNothingBtn.onclick = () => startLevelTest();
  elements.knowSomethingBtn.onclick = () => startLevelTest();
  elements.continueToCountriesBtn.onclick = () => {
    showScreen('countrySelection');
    updateCountrySelectionScreen();
  };
  elements.countryOptions.forEach(opt => {
    opt.onclick = () => {
      const cid = opt.getAttribute('data-country');
      selectCountry(cid);
    };
  });
  elements.restartGameBtn.onclick = () => {
    state.visitedCountries = [];
    saveProgress();
    showScreen('knowledgeCheck');
    updateCountrySelectionScreen();
  };
}

window.addEventListener('DOMContentLoaded', () => {
  showScreen('loading');
  setTimeout(() => {
    showScreen('knowledgeCheck');
    updateCountrySelectionScreen();
    setupListeners();
  }, 1200);
});
const gameState = {
  currentTestQuestion: 0,
  testScore: 0,
  selectedTestOption: null,
  testFeedback: null,
  currentDialogueId: null,
  selectedWords: [],
  currentMiniGameType: null,
  currentMiniGameData: null,
  currentScenarioProgress: 0,
  completedScenarios: [],
  unlockedCountries: [],
  playerInventory: [],
  achievements: [],
  
  // Daily life state
  dailyLife: {
    currentCountry: null,
    currentDay: 0,
    currentChallenge: 0,
    completedDays: []
  }
};

// ========== DAILY LIFE FUNCTIONS ==========

function startDailyLife(country) {
  gameState.dailyLife = {
    currentCountry: country,
    currentDay: 0,
    currentChallenge: 0,
    completedDays: []
  };
  
  // Configurar a tela de transição
  const countryData = gameData.countries[country];
  document.getElementById('destination-country').textContent = countryData.name;
  
  // Mostrar tela de transição
  showScreen('transition-screen');
  
  // Animação da barra de progresso
  const progressFill = document.querySelector('#transition-screen .progress-fill');
  progressFill.style.width = '0%';
  setTimeout(() => {
    progressFill.style.width = '100%';
  }, 50);
  
  // Depois de 3 segundos, iniciar o primeiro dia
  setTimeout(() => {
    startCurrentDay();
  }, 3000);
}

function startCurrentDay() {
  const country = gameState.dailyLife.currentCountry;
  const dayIndex = gameState.dailyLife.currentDay;
  const countryData = gameData.dailyLife[country];
  const day = countryData.days[dayIndex];
  
  // Reset challenge progress
  gameState.dailyLife.currentChallenge = 0;
  gameState.currentScenarioProgress = 0;
  
  // Start first challenge
  startChallenge(day.challenges[0]);
}

function startChallenge(challenge) {
  if (challenge.type === "dialogue") {
    gameData.currentScenario = challenge.scenario;
    gameState.currentDialogueId = "start";
    
    // Set background
    elements.gameBackgroundEl.style.backgroundImage = `url('assets/backgrounds/${challenge.background}')`;
    
    showScreen('game-screen');
    renderDialogue();
  } else if (challenge.type === "minigame") {
    startMiniGame(challenge.game);
  }
}

function completeCurrentDay() {
  const country = gameState.dailyLife.currentCountry;
  const dayIndex = gameState.dailyLife.currentDay;
  const countryData = gameData.dailyLife[country];
  
  // Calculate day score
  const dayScore = Math.min(100, gameState.currentScenarioProgress);
  
  // Add to completed days
  gameState.dailyLife.completedDays.push({
    country: country,
    day: dayIndex,
    title: countryData.days[dayIndex].title,
    score: dayScore,
    date: new Date().toLocaleDateString()
  });
  
  // Check if there are more days
  if (dayIndex + 1 < countryData.days.length) {
    // Move to next day
    gameState.dailyLife.currentDay++;
    startCurrentDay();
  } else {
    // Country completed
    showCountryCompletion();
  }
}

function calculateAverageScore() {
  const totalDays = gameState.dailyLife.completedDays.length;
  if (totalDays === 0) return 0;
  
  const totalScore = gameState.dailyLife.completedDays.reduce((sum, day) => sum + day.score, 0);
  return Math.round(totalScore / totalDays);
}

function determineFavoriteCountry() {
  const countryScores = {};
  
  gameState.dailyLife.completedDays.forEach(day => {
    if (!countryScores[day.country]) {
      countryScores[day.country] = 0;
    }
    countryScores[day.country] += day.score;
  });
  
  return Object.keys(countryScores).reduce((a, b) => 
    countryScores[a] > countryScores[b] ? a : b
  );
}

function showCountryCompletion() {
  const country = gameState.dailyLife.currentCountry;
  const countryData = gameData.countries[country];
  const averageScore = calculateAverageScore();
  
  // Show completion screen
  showScreen('certificate-screen');
  
  // Update certificate
  elements.certificateNameEl.textContent = gameData.playerProfile.name || "Traveler";
  elements.certificateFlagEl.src = countryData.flag;
  elements.certificateCountryEl.textContent = countryData.name;
  elements.certificateLevelEl.textContent = `Average Score: ${averageScore}%`;
  elements.certificateDateEl.textContent = new Date().toLocaleDateString();
  
  // Select a random character for signature
  const randomChar = countryData.characters[Math.floor(Math.random() * countryData.characters.length)];
  elements.characterSignatureImgEl.src = randomChar.avatar;
  elements.characterSignatureNameEl.textContent = randomChar.name;
  
  // Play celebration sound
  playSound('celebration');
}

// ========== CORE GAME FUNCTIONS ==========

function initGame() {
  // Load player profile
  loadPlayerProfile();
  
  // Set up event listeners
  setupEventListeners();
  
  // Start background music
  elements.backgroundMusic.volume = 0.5;
  elements.backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
  
  // Simulate loading
  setTimeout(() => {
    showScreen('knowledge-check');
  }, 3000);
}

function loadPlayerProfile() {
  if (gameData.playerProfile.name) {
    elements.playerNameEl.textContent = gameData.playerProfile.name;
    elements.certificateNameEl.textContent = gameData.playerProfile.name;
  }
  
  if (gameData.playerProfile.character) {
    const gender = gameData.playerProfile.gender?.toLowerCase() || 'other';
    elements.playerAvatar.src = `assets/characters/player-${gender}.png`;
  }
  
  if (!gameData.playerProfile.name) {
    elements.playerNameEl.textContent = "Adventurer";
    elements.certificateNameEl.textContent = "Adventurer";
  }
}

function setupEventListeners() {
  // Knowledge check buttons
  elements.knowNothingBtn.addEventListener('click', () => {
    playSound('click');
    gameData.englishLevel = 'beginner';
    showLevelResult();
  });
  
  elements.knowSomethingBtn.addEventListener('click', () => {
    playSound('click');
    startEnglishTest();
    showScreen('level-test');
  });
  
  // Level test buttons
  elements.nextQuestionBtn.addEventListener('click', nextQuestion);
  
  // Level result continue button
  elements.continueToCountriesBtn.addEventListener('click', () => {
    playSound('click');
    showScreen('country-selection');
  });
  
  // Country selection
  elements.countryOptions.forEach(option => {
    option.addEventListener('click', () => {
      playSound('click');
      selectCountry(option.dataset.country);
    });
  });
  
  // Submit answer button
  elements.submitAnswerBtn.addEventListener('click', checkMiniGameAnswer);
  
  // Restart game button
  elements.restartGameBtn.addEventListener('click', () => {
    playSound('click');
    resetGame();
    showScreen('knowledge-check');
  });
  
  // Share certificate button
  elements.shareCertificateBtn.addEventListener('click', shareCertificate);
}

function showScreen(screenId) {
  // Hide all screens first
  Object.values(elements.screens).forEach(screen => {
    if (screen && screen.classList) {
      screen.classList.remove('active');
    }
  });
  
  // Map screen IDs to handle both hyphenated and camelCase
  const screenIdMap = {
    'knowledge-check': 'knowledgeCheck',
    'level-test': 'levelTest',
    'level-result': 'levelResult',
    'country-selection': 'countrySelection',
    'game-screen': 'gameScreen',
    'mini-game-screen': 'miniGameScreen',
    'certificate-screen': 'certificateScreen',
    'transition-screen': 'transitionScreen',
    'loading': 'loading'
  };
  
  // Get the correct screen key
  const screenKey = screenIdMap[screenId] || screenId;
  
  // Show the requested screen
  const screenElement = elements.screens[screenKey];
  if (!screenElement) {
    console.error(`Screen element not found for: ${screenId} (mapped to: ${screenKey})`);
    return;
  }
  
  if (screenElement.classList) {
    screenElement.classList.add('active');
  } else {
    console.error(`Element for screen ${screenId} has no classList`);
    return;
  }
  
  // Special setup for certain screens
  switch(screenId) {
    case 'level-test':
      renderTestQuestion();
      break;
    case 'level-result':
      showLevelResult();
      break;
    case 'game-screen':
      startGameScenario();
      break;
    case 'mini-game-screen':
      renderMiniGame();
      break;
    case 'certificate-screen':
      showCertificate();
      break;
    case 'transition-screen':
      // No special setup needed for transition screen
      break;
  }
  
  playSound('transition');
}

function startEnglishTest() {
  gameState.currentTestQuestion = 0;
  gameState.testScore = 0;
  gameState.testFeedback = null;
}

function renderTestQuestion() {
  const question = gameData.testQuestions[gameState.currentTestQuestion];
  
  // Update progress
  const progressPercent = (gameState.currentTestQuestion / gameData.testQuestions.length) * 100;
  elements.testProgressFill.style.width = `${progressPercent}%`;
  elements.currentQuestionEl.textContent = gameState.currentTestQuestion + 1;
  elements.totalQuestionsEl.textContent = gameData.testQuestions.length;
  
  // Set question text
  elements.testQuestionEl.textContent = question.question;
  
  // Clear previous options and feedback
  elements.testOptionsEl.innerHTML = '';
  elements.testFeedbackEl.classList.add('hidden');
  elements.nextQuestionBtn.classList.add('hidden');
  
  // Add new options
  question.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'test-option';
    optionEl.textContent = option.text;
    optionEl.dataset.index = index;
    
    optionEl.addEventListener('click', () => {
      playSound('click');
      
      // Remove selected class from all options
      document.querySelectorAll('.test-option').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Add selected class to clicked option
      optionEl.classList.add('selected');
      gameState.selectedTestOption = index;
      gameState.testFeedback = {
        isCorrect: option.correct,
        explanation: option.explanation
      };
      
      // Show feedback immediately
      showTestFeedback();
    });
    
    elements.testOptionsEl.appendChild(optionEl);
  });
}

function showTestFeedback() {
  const feedback = gameState.testFeedback;
  
  elements.testFeedbackEl.className = 'test-feedback';
  elements.feedbackIconEl.className = 'feedback-icon';
  
  if (feedback.isCorrect) {
    elements.testFeedbackEl.classList.add('correct');
    elements.feedbackIconEl.classList.add('correct');
    elements.feedbackIconEl.innerHTML = '✓';
    elements.feedbackTextEl.textContent = feedback.explanation;
    playSound('success');
  } else {
    elements.testFeedbackEl.classList.add('incorrect');
    elements.feedbackIconEl.classList.add('incorrect');
    elements.feedbackIconEl.innerHTML = '✗';
    elements.feedbackTextEl.textContent = feedback.explanation;
    playSound('failure');
  }
  
  elements.testFeedbackEl.classList.remove('hidden');
  elements.nextQuestionBtn.classList.remove('hidden');
}

function nextQuestion() {
  playSound('click');
  
  // Check if answer is correct
  if (gameState.testFeedback.isCorrect) {
    gameState.testScore += 10;
  }
  
  // Move to next question or finish test
  gameState.currentTestQuestion++;
  gameState.selectedTestOption = null;
  gameState.testFeedback = null;
  
  if (gameState.currentTestQuestion < gameData.testQuestions.length) {
    renderTestQuestion();
  } else {
    finishEnglishTest();
  }
}

function finishEnglishTest() {
  // Determine English level based on score
  const level = gameData.levels.find(l => 
    gameState.testScore >= l.minScore && gameState.testScore <= l.maxScore
  );
  
  gameData.englishLevel = level.name.toLowerCase();
  
  // Show level result
  showScreen('level-result');
}

function showLevelResult() {
  const level = gameData.levels.find(l => l.name.toLowerCase() === gameData.englishLevel);
  
  // Set level information
  elements.levelBadgeEl.src = level.badge;
  elements.levelTitleEl.textContent = level.name;
  elements.levelDescriptionEl.textContent = level.description;
  
  // Set skills list
  elements.skillsListEl.innerHTML = '';
  level.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    elements.skillsListEl.appendChild(li);
  });
  
  // Set player level in profile
  elements.playerLevelEl.textContent = level.name;
}

function selectCountry(countryId) {
  playSound('click');
  gameData.selectedCountry = countryId;
  
  // Highlight selected country
  elements.countryOptions.forEach(option => {
    option.classList.remove('selected');
    if (option.dataset.country === countryId) {
      option.classList.add('selected');
    }
  });
  
  // Start game after short delay
  setTimeout(() => {
    showScreen('game-screen');
  }, 500);
}

function startGameScenario() {
  // Set background based on scenario
  const countryData = gameData.countries[gameData.selectedCountry];
  elements.gameBackgroundEl.style.backgroundImage = `url('assets/backgrounds/${countryData.background}')`;
  
  // Start with first dialogue
  gameState.currentDialogueId = "welcome";
  renderDialogue();
}

function renderDialogue() {
  const scenario = gameData.currentScenario ? 
    gameData.scenarios[gameData.currentScenario] : 
    gameData.scenarios.airport;
  
  const dialogue = scenario.dialogues.find(d => d.id === gameState.currentDialogueId);
  
  if (!dialogue) {
    console.error("Dialogue not found:", gameState.currentDialogueId);
    return;
  }
  
  // Get character info
  const countryData = gameData.countries[gameData.selectedCountry];
  let character;
  
  if (dialogue.speaker === 'system') {
    character = { name: "System", avatar: "assets/characters/system.png" };
  } else if (dialogue.speaker === 'player') {
    character = { 
      name: gameData.playerProfile.name || "You", 
      avatar: elements.playerAvatar.src 
    };
  } else {
    character = countryData.characters.find(c => c.id === dialogue.speaker) || 
      { name: "Local", avatar: "assets/characters/generic.png" };
  }
  
  // Set character info
  elements.npcAvatar.src = character.avatar;
  elements.npcNameEl.textContent = character.name;
  
  // Animate character appearance
  elements.npcAvatar.classList.add('animate__animated', 'animate__fadeIn');
  setTimeout(() => {
    elements.npcAvatar.classList.remove('animate__animated', 'animate__fadeIn');
  }, 1000);
  
  // Process dialogue text (replace variables)
  let dialogueText = dialogue.text
    .replace('{country}', countryData.name)
    .replace('{playerName}', gameData.playerProfile.name || "traveler");
  
  // Typewriter effect for dialogue
  elements.dialogueContent.textContent = '';
  let i = 0;
  const speed = 20;
  
  function typeWriter() {
    if (i < dialogueText.length) {
      elements.dialogueContent.textContent += dialogueText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
      playSound('dialogue');
    }
  }
  
  typeWriter();
  
  // Clear previous options
  elements.dialogueOptions.innerHTML = '';
  
  // Check for special actions
  if (dialogue.action) {
    setTimeout(() => {
      dialogue.action();
    }, dialogueText.length * speed + 500);
    return;
  }
  
  // If there are options, show them with animation
  if (dialogue.options) {
    setTimeout(() => {
      dialogue.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'dialogue-option animate__animated animate__fadeInUp';
        optionEl.style.animationDelay = `${index * 0.1}s`;
        optionEl.textContent = option.text;
        
        optionEl.addEventListener('click', () => {
          playSound('click');
          selectDialogueOption(option);
        });
        
        elements.dialogueOptions.appendChild(optionEl);
      });
    }, dialogueText.length * speed + 200);
  } else if (dialogue.next) {
    // If no options but has next, show continue button
    setTimeout(() => {
      const continueBtn = document.createElement('div');
      continueBtn.className = 'dialogue-option animate__animated animate__fadeIn';
      continueBtn.textContent = "Continue";
      
      continueBtn.addEventListener('click', () => {
        playSound('click');
        gameState.currentDialogueId = dialogue.next;
        renderDialogue();
      });
      
      elements.dialogueOptions.appendChild(continueBtn);
    }, dialogueText.length * speed + 200);
  }
}

function selectDialogueOption(option) {
  // Add to score
  gameData.score += option.points * 10;
  gameState.currentScenarioProgress += option.points * 10;
  
  // Check if next is a mini-game
  if (option.next === 'mini_game') {
    startMiniGame();
  } else {
    // Move to next dialogue
    gameState.currentDialogueId = option.next;
    renderDialogue();
  }
}

function startMiniGame(gameType) {
  // Determine game type
  gameState.currentMiniGameType = gameType || 
    Object.keys(gameData.miniGames)[Math.floor(Math.random() * Object.keys(gameData.miniGames).length)];
  
  // Generate mini-game content
  gameState.currentMiniGameData = gameData.miniGames[gameState.currentMiniGameType].generate(gameData.englishLevel);
  
  // Set background
  const countryData = gameData.countries[gameData.selectedCountry];
  elements.miniGameBackgroundEl.style.backgroundImage = `url('assets/backgrounds/${countryData.background}')`;
  
  // Show mini-game screen
  showScreen('mini-game-screen');
}

function renderMiniGame() {
  elements.miniGameContentEl.innerHTML = '';
  elements.miniGameFeedbackEl.classList.add('hidden');
  
  // Set mini-game title and instructions
  elements.miniGameTitleEl.textContent = gameState.currentMiniGameData.name;
  
  let instructions = gameData.miniGames[gameState.currentMiniGameType].instructions;
  if (instructions.includes('{country}')) {
    const countryData = gameData.countries[gameData.selectedCountry];
    instructions = instructions.replace('{country}', countryData.name);
  }
  elements.miniGameInstructionsEl.textContent = instructions;
  
  // Create question element
  const questionEl = document.createElement('div');
  questionEl.className = 'mini-game-question';
  questionEl.textContent = gameState.currentMiniGameData.question;
  elements.miniGameContentEl.appendChild(questionEl);
  
  // Render based on game type
  switch(gameState.currentMiniGameType) {
    case 'word_order':
      renderWordOrderGame();
      break;
    case 'fill_blank':
      renderFillBlankGame();
      break;
    case 'correct_mistake':
      renderCorrectMistakeGame();
      break;
    case 'cultural_quiz':
      renderCulturalQuizGame();
      break;
    case 'order_food':
      renderOrderFoodGame();
      break;
  }
}

function renderWordOrderGame() {
  const builderEl = document.createElement('div');
  builderEl.className = 'word-order-container';
  builderEl.id = 'sentence-builder';
  elements.miniGameContentEl.appendChild(builderEl);
  
  const bankEl = document.createElement('div');
  bankEl.className = 'word-bank';
  
  gameState.currentMiniGameData.wordBank.forEach((word, index) => {
    const wordEl = document.createElement('div');
    wordEl.className = 'word-piece animate__animated animate__fadeIn';
    wordEl.style.animationDelay = `${index * 0.1}s`;
    wordEl.textContent = word;
    wordEl.dataset.index = index;
    
    wordEl.addEventListener('click', () => {
      playSound('click');
      
      if (wordEl.parentElement === bankEl) {
        gameState.selectedWords.push(word);
        builderEl.appendChild(wordEl);
      } else {
        const wordIndex = gameState.selectedWords.indexOf(word);
        if (wordIndex > -1) {
          gameState.selectedWords.splice(wordIndex, 1);
          bankEl.appendChild(wordEl);
        }
      }
    });
    
    bankEl.appendChild(wordEl);
  });
  
  elements.miniGameContentEl.appendChild(bankEl);
}

function renderFillBlankGame() {
  const optionsEl = document.createElement('div');
  optionsEl.className = 'fill-blank-options';
  
  gameState.currentMiniGameData.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'fill-blank-option animate__animated animate__fadeIn';
    optionEl.style.animationDelay = `${index * 0.1}s`;
    optionEl.textContent = option;
    optionEl.dataset.index = index;
    
    optionEl.addEventListener('click', () => {
      playSound('click');
      
      document.querySelectorAll('.fill-blank-option').forEach(el => {
        el.classList.remove('selected');
      });
      
      optionEl.classList.add('selected');
      gameState.selectedTestOption = index;
    });
    
    optionsEl.appendChild(optionEl);
  });
  
  elements.miniGameContentEl.appendChild(optionsEl);
}

function renderCorrectMistakeGame() {
  const sentenceEl = document.createElement('div');
  sentenceEl.className = 'incorrect-sentence animate__animated animate__fadeIn';
  sentenceEl.textContent = gameState.currentMiniGameData.sentence;
  elements.miniGameContentEl.appendChild(sentenceEl);
  
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.className = 'correction-input animate__animated animate__fadeIn';
  inputEl.placeholder = 'Type the correct sentence here...';
  inputEl.id = 'correction-input';
  elements.miniGameContentEl.appendChild(inputEl);
}

function renderCulturalQuizGame() {
  const optionsEl = document.createElement('div');
  optionsEl.className = 'fill-blank-options';
  
  gameState.currentMiniGameData.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'fill-blank-option animate__animated animate__fadeIn';
    optionEl.style.animationDelay = `${index * 0.1}s`;
    optionEl.textContent = option;
    optionEl.dataset.index = index;
    
    optionEl.addEventListener('click', () => {
      playSound('click');
      
      document.querySelectorAll('.fill-blank-option').forEach(el => {
        el.classList.remove('selected');
      });
      
      optionEl.classList.add('selected');
      gameState.selectedTestOption = index;
    });
    
    optionsEl.appendChild(optionEl);
  });
  
  elements.miniGameContentEl.appendChild(optionsEl);
}

function renderOrderFoodGame() {
  const gameContainer = document.createElement('div');
  gameContainer.className = 'order-food-game';
  
  const menuEl = document.createElement('div');
  menuEl.className = 'food-menu';
  
  const orderEl = document.createElement('div');
  orderEl.className = 'food-order';
  
  const totalEl = document.createElement('div');
  totalEl.className = 'order-total';
  totalEl.textContent = `Budget: $${gameState.currentMiniGameData.budget.toFixed(2)}`;
  
  const submitBtn = document.createElement('button');
  submitBtn.className = 'submit-order';
  submitBtn.textContent = 'Submit Order';
  submitBtn.addEventListener('click', () => {
    const selectedItems = Array.from(document.querySelectorAll('.food-item.selected'))
      .map(el => ({
        name: el.dataset.name,
        price: parseFloat(el.dataset.price)
      }));
    
    const isValid = gameData.miniGames.order_food.checkAnswer(selectedItems, gameState.currentMiniGameData);
    showMiniGameFeedback(isValid);
    
    if (isValid) {
      gameData.score += 20;
      gameState.currentScenarioProgress += 20;
    } else {
      gameData.score += 5;
      gameState.currentScenarioProgress += 5;
    }
  });
  
  gameState.currentMiniGameData.items.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'food-item animate__animated animate__fadeIn';
    itemEl.dataset.name = item.name;
    itemEl.dataset.price = item.price;
    itemEl.innerHTML = `
      <div class="food-name">${item.name}</div>
      <div class="food-price">${item.price}</div>
    `;
    
    itemEl.addEventListener('click', () => {
      playSound('click');
      itemEl.classList.toggle('selected');
    });
    
    menuEl.appendChild(itemEl);
  });
  
  gameContainer.appendChild(menuEl);
  gameContainer.appendChild(orderEl);
  gameContainer.appendChild(totalEl);
  gameContainer.appendChild(submitBtn);
  elements.miniGameContentEl.appendChild(gameContainer);
}

function checkMiniGameAnswer() {
  playSound('click');
  
  let isCorrect = false;
  let userAnswer = "";
  const gameType = gameData.miniGames[gameState.currentMiniGameType];
  
  switch(gameState.currentMiniGameType) {
    case 'word_order':
      userAnswer = gameState.selectedWords.join(' ');
      isCorrect = gameType.checkAnswer(userAnswer, gameState.currentMiniGameData.correctAnswer);
      break;
      
    case 'fill_blank':
    case 'cultural_quiz':
      isCorrect = gameState.selectedTestOption === gameState.currentMiniGameData.correctAnswer;
      userAnswer = gameState.currentMiniGameData.options[gameState.selectedTestOption];
      break;
      
    case 'correct_mistake':
      userAnswer = document.getElementById('correction-input').value;
      isCorrect = gameType.checkAnswer(userAnswer, gameState.currentMiniGameData.correctAnswer);
      break;
  }
  
  // Show feedback
  showMiniGameFeedback(isCorrect);
  
  // Update score and progress
  if (isCorrect) {
    gameData.score += 20;
    gameState.currentScenarioProgress += 20;
  } else {
    gameData.score += 5;
    gameState.currentScenarioProgress += 5;
  }
  
  // Check if we're in daily life mode
  if (gameState.dailyLife.currentCountry) {
    const countryData = gameData.dailyLife[gameState.dailyLife.currentCountry];
    const day = countryData.days[gameState.dailyLife.currentDay];
    
    if (gameState.dailyLife.currentChallenge < day.challenges.length - 1) {
      // Move to next challenge
      setTimeout(() => {
        gameState.dailyLife.currentChallenge++;
        startChallenge(day.challenges[gameState.dailyLife.currentChallenge]);
      }, 2000);
    } else {
      // Day completed
      setTimeout(() => {
        completeCurrentDay();
      }, 2000);
    }
  } else {
    // Original game flow
    setTimeout(() => {
      gameState.currentDialogueId = "scenario_complete";
      showScreen('game-screen');
    }, 2000);
  }
}

function showMiniGameFeedback(isCorrect) {
  elements.miniGameFeedbackEl.className = 'mini-game-feedback';
  elements.miniGameFeedbackIconEl.className = 'feedback-icon';
  
  if (isCorrect) {
    elements.miniGameFeedbackEl.classList.add('correct', 'show');
    elements.miniGameFeedbackIconEl.classList.add('correct');
    elements.miniGameFeedbackIconEl.innerHTML = '✓';
    
    const randomFeedback = gameData.feedback.positive[
      Math.floor(Math.random() * gameData.feedback.positive.length)
    ];
    elements.miniGameFeedbackTextEl.textContent = randomFeedback;
    
    playSound('success');
  } else {
    elements.miniGameFeedbackEl.classList.add('incorrect', 'show');
    elements.miniGameFeedbackIconEl.classList.add('incorrect');
    elements.miniGameFeedbackIconEl.innerHTML = '✗';
    
    const randomFeedback = gameData.feedback.negative[
      Math.floor(Math.random() * gameData.feedback.negative.length)
    ];
    
    let feedbackText = randomFeedback;
    if (gameState.currentMiniGameData.explanation) {
      feedbackText += ` ${gameState.currentMiniGameData.explanation}`;
    }
    
    elements.miniGameFeedbackTextEl.innerHTML = `
      ${feedbackText}<br><br>
      <strong>Correct answer:</strong> ${gameState.currentMiniGameData.correctAnswer}
    `;
    
    playSound('failure');
  }
  
  elements.submitAnswerBtn.disabled = true;
}

function showCertificate() {
  const countryData = gameData.countries[gameData.selectedCountry];
  const level = gameData.levels.find(l => l.name.toLowerCase() === gameData.englishLevel);
  
  elements.certificateNameEl.textContent = gameData.playerProfile.name || "Traveler";
  elements.certificateFlagEl.src = countryData.flag;
  elements.certificateCountryEl.textContent = countryData.name;
  elements.certificateLevelEl.textContent = level.name;
  elements.certificateDateEl.textContent = new Date().toLocaleDateString();
  
  // Select a random character for signature
  const randomChar = countryData.characters[Math.floor(Math.random() * countryData.characters.length)];
  elements.characterSignatureImgEl.src = randomChar.avatar;
  elements.characterSignatureNameEl.textContent = randomChar.name;
  
  playSound('celebration');
}

function shareCertificate() {
  playSound('click');
  
  if (navigator.share) {
    navigator.share({
      title: 'My Cultural English Adventure Certificate',
      text: `I completed the Cultural English Adventure in ${gameData.countries[gameData.selectedCountry].name} and achieved ${gameData.englishLevel} level!`,
      url: window.location.href
    }).catch(err => {
      console.log('Error sharing:', err);
      alert('Sharing failed. Please try another method.');
    });
  } else {
    alert('Web Share API not supported in your browser. You can take a screenshot to share your certificate!');
  }
}

function resetGame() {
  gameData.englishLevel = null;
  gameData.selectedCountry = null;
  gameData.currentScenario = null;
  gameData.score = 0;
  gameData.currentDialogue = null;
  gameData.currentMiniGame = null;
  
  gameState.currentTestQuestion = 0;
  gameState.testScore = 0;
  gameState.selectedTestOption = null;
  gameState.testFeedback = null;
  gameState.currentDialogueId = null;
  gameState.selectedWords = [];
  gameState.currentMiniGameType = null;
  gameState.currentMiniGameData = null;
  gameState.currentScenarioProgress = 0;
  gameState.completedScenarios = [];
  gameState.dailyLife = {
    currentCountry: null,
    currentDay: 0,
    currentChallenge: 0,
    completedDays: []
  };
}

function playSound(type) {
  try {
    const sound = elements[`${type}Sound`];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  } catch (e) {
    console.log("Error playing sound:", e);
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);