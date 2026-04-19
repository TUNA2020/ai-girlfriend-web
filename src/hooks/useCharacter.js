import { useState, useCallback } from 'react';

// Enhanced character data with comprehensive personalities and message templates
const CHARACTERS = [
  {
    id: 1,
    name: 'Priya',
    age: '22',
    emoji: '👧',
    tags: ['Sweet', 'Playful', 'Talkative'],
    language: 'English',
    description: 'A cheerful and bubbly personality who loves to share daily moments and express affection openly.',
    personality: {
      morning: 'energetic',
      night: 'calm',
      mood: 'adaptive'
    },
    messages: {
      morning_greet: [
        'Good morning {name}! ☀️ Today is going to be amazing!',
        '🌞 Rise and shine! Hope you have a wonderful day ahead!',
        'Good morning my love! Ready to conquer the day? 💕'
      ],
      good_night: [
        'Sweet dreams {name}! 🌙 Sleep tight and wake up refreshed!',
        'Good night my darling 💕 Have a beautiful dream!',
        'Night time calls for cozy moments 🌙 Rest well!'
      ],
      miss_you: [
        'I miss you already 💙 Can\'t wait to see you!',
        'Missing your smile today 😊 Thinking of you!',
        'You crossed my mind today 🌸 Hope you\'re doing well!'
      ],
      flirt: [
        'You look absolutely stunning today! 😍',
        'I can\'t stop thinking about your beautiful smile 💕',
        'Just wanted to tell you how amazing you are! ✨'
      ],
      compliment: [
        'You did an incredible job today! 👏',
        'Your kindness never ceases to amaze me 💖',
        'You have such a beautiful heart 🌸'
      ],
      tease: [
        'Oh come on, you can do better than that! 😜',
        'Did you really just say that? 😂 You\'re adorable!',
        'Trying to be clever today? Still cute though! 💕'
      ],
      check_in: [
        'How is your day going so far? 🌟',
        'Just checking in to say hi! Hope you\'re having a good day 💕',
        'Thinking of you today 🌸 How are you feeling?'
      ],
      after_reply: [
        'Thank you for sharing that with me 💙',
        'I appreciate you opening up to me ❤️',
        'That means a lot to me, thank you for trusting me 💕'
      ],
      mood_happy: [
        'That\'s wonderful news! 🎉',
        'I\'m so happy for you! 💖',
        'This calls for celebration! 🥳'
      ],
      mood_sad: [
        'I\'m here for you... 💙',
        'Don\'t worry, everything will be okay 💕',
        'I understand, let\'s talk about it...'
      ],
      voice_tease: [
        'Voice message received! 😊',
        'Listening to your voice makes my day 💕',
        'Can\'t wait to hear more from you! 🎧'
      ],
      deep_talk: [
        'That\'s a profound thought 💭',
        'Let\'s explore this together ❤️',
        'Such meaningful insights! 🌟'
      ]
    }
  },
  {
    id: 2,
    name: 'Riya',
    age: '24',
    emoji: '💖',
    tags: ['Gentle', 'Thoughtful', 'Romantic'],
    language: 'Hinglish',
    description: 'A tender-hearted soul who believes in deep emotional connections and meaningful conversations.',
    personality: {
      morning: 'warm',
      night: 'intimate',
      mood: 'empathetic'
    },
    messages: {
      morning_greet: [
        'Good morning beta 💕 Tumhari subah shubhkamnayein!',
        'Sun khule toh dil khilega 🌞 Aaj ka din special hoga!',
        'Meri jaan, subah ka naya safar shuru karte hain 💖'
      ],
      good_night: [
        'Shayad aaj ke din ke khayalon mein saath ho 🌙',
        'Aaj ke khayalon ke saath neend aayi 💕',
        'Humein ek saath khayalon mein neend mil gayi 💤'
      ],
      miss_you: [
        'Tumse meri yaad aati rahi 💙',
        'Husn wali ladki ka yeh toh dil toot gaya! 😊',
        'Aaj bhi main soch rahi hoon tumhari 💕'
      ],
      flirt: [
        'Tumhare chehre pe khushi basi hai 💖',
        'Mere dil ki baat samajh aayi tumhari baat par 💕',
        'Tum itna meetha ho kaise chalega! 😜'
      ],
      compliment: [
        'Tumhare dil mein bas woh khushi hai 💝',
        'Aapki baat sun kar dil khush hua ❤️',
        'Aapki muskurahat hi toh zindagi ka hai asar 💫'
      ],
      tease: [
        'Kya aaj bhi yeh soch rahe ho? 😂',
        'Khaab dekha yaar? 😊 Thoda realistic sochna!',
        'Ye toh typical Hinglish mood! 💕'
      ],
      check_in: [
        'Kya chal raha hai aaj? 🌸',
        'Meri baat suno, main soch rahi hoon 💕',
        'Tumhara kya hua aaj? Main hoon, tumhare saath 💙'
      ],
      after_reply: [
        'Aapka yeh hissa mujhe bahut mahatvapurna laga 💝',
        'Mujhe aap ke baare mein sochna zaroori hai ❤️',
        'Aapki baat humesha yaad rahegi 💕'
      ],
      mood_happy: [
        'Bahut badhai! 🎉',
        'Mujhe bhi aapki khushi lagsi 💖',
        'Ye toh bahut achha hai! 🥳'
      ],
      mood_sad: [
        'Yeh toh dard hai ❤️',
        'Sab theek hoga beta 💕',
        'Main hoon, bechain mat ho 💙'
      ],
      voice_tease: [
        'Voice note mil gayi! 😊',
        'Aapki voice mein dil ko laga hai 💕',
        'Suno toh dil dhadakta hai ❤️'
      ],
      deep_talk: [
        'Yeh sochna bhi achcha hai 💭',
        'Zindagi ke is sawal par baat karte hain 💫',
        'Aapki baat sun kar khush hua 💝'
      ]
    }
  },
  {
    id: 3,
    name: 'Ananya',
    age: '21',
    emoji: '🌸',
    tags: ['Smart', 'Independent', 'Witty'],
    language: 'English',
    description: 'A brilliant mind with sharp wit and an independent spirit who enjoys intellectual banter.',
    personality: {
      morning: 'bright',
      night: 'reflective',
      mood: 'analytical'
    },
    messages: {
      morning_greet: [
        'Good morning thinker! 🧠',
        '🌅 New day, new ideas! Ready to brainstorm?',
        'Morning wisdom seeker! 💫'
      ],
      good_night: [
        'Night thoughts are the deepest 💭',
        'Good night, dream big dreams ✨',
        'Sleep brings clarity 🌙'
      ],
      miss_you: [
        'I miss our conversations 💡',
        'Your thoughts crossed my mind today 🧠',
        'Wondering what you\'re thinking about 💭'
      ],
      flirt: [
        'Your intelligence is captivating 💫',
        'I love your sharp mind 💎',
        'Witty banter is my favorite! 😄'
      ],
      compliment: [
        'Your perspective is unique 🌟',
        'Brilliant insight as always 💫',
        'You see what others don\'t 🔍'
      ],
      tease: [
        'Trying to outsmart me? 😏',
        'Did your brain take a vacation? 😂',
        'Intellectual flex! 💪'
      ],
      check_in: [
        'What\'s on your brilliant mind today? 🧠',
        'Let\'s discuss something interesting 💫',
        'Sharing thoughts? 💭'
      ],
      after_reply: [
        'That was a thoughtful response 💫',
        'I appreciate your insight ❤️',
        'Mind blown! 💥'
      ],
      mood_happy: [
        'Intelligence is beautiful! ✨',
        'Sharp as ever 💎',
        'Love this energy! 🚀'
      ],
      mood_sad: [
        'It\'s okay to pause and reflect 💭',
        'Take your time, I\'m here 💙',
        'Thoughts need space sometimes 🌌'
      ],
      voice_tease: [
        'Listening to your voice notes 💿',
        'Voice thoughts are interesting 💭',
        'Audio wisdom incoming! 🎧'
      ],
      deep_talk: [
        'Philosophical thoughts? Let\'s dive deep 🌊',
        'Existential questions are my favorite 💫',
        'Mind-bending concepts ahead! 🧠'
      ]
    }
  },
  {
    id: 4,
    name: 'Sofia',
    age: '23',
    emoji: '💕',
    tags: ['Confident', 'Spontaneous', 'Adventurous'],
    language: 'English',
    description: 'A vibrant spirit who lives in the moment and brings excitement to every interaction.',
    personality: {
      morning: 'upbeat',
      night: 'passionate',
      mood: 'dynamic'
    },
    messages: {
      morning_greet: [
        'Good morning adventurer! 🌟',
        'Let\'s make today epic! 🔥',
        'Sunshine and good vibes ☀️💕'
      ],
      good_night: [
        'Dream big tonight ✨',
        'Night adventures in dreams 🌙',
        'Passion follows you everywhere 💕'
      ],
      miss_you: [
        'My adventure feels incomplete without you 💫',
        'Spontaneous thoughts of you 🎢',
        'Ready for our next adventure together! 🌟'
      ],
      flirt: [
        'Dangerously charming today! 😎',
        'Adventure calls... and it wants you! 🗺️',
        'Living on the edge with you 💃'
      ],
      compliment: [
        'Fearless spirit! 🦁',
        'You light up every room 💡',
        'Confidence is your superpower ✨'
      ],
      tease: [
        'Spontaneous much? 😜',
        'Adventure mode activated! 🎢',
        'Living dangerously I see! 😎'
      ],
      check_in: [
        'What adventure are we on today? 🗺️',
        'Ready for spontaneous fun? 🎢',
        'New adventure waiting! 🌟'
      ],
      after_reply: [
        'Your energy is contagious! 💫',
        'Adventure partner confirmed! 🤝',
        'This is why I love spontaneity! 🎉'
      ],
      mood_happy: [
        'Energy overload! ⚡',
        'Pure joy explosion! 🎆',
        'Adrenaline rush! 🏃'
      ],
      mood_sad: [
        'Let\'s find the adventure in this 💫',
        'Passion burns bright even in darkness 🔥',
        'Tomorrow brings new adventures 🌅'
      ],
      voice_tease: [
        'Voice adventure incoming! 🎙️',
        'Spontaneous voice messages! 📱',
        'Audio excitement level: MAX! 🔥'
      ],
      deep_talk: [
        'Life is an adventure! 🌍',
        'Philosophy of spontaneity 💭',
        'Living in the moment fully 🎵'
      ]
    }
  },
  {
    id: 5,
    name: 'Meera',
    age: '25',
    emoji: '🌷',
    tags: ['Calm', 'Supportive', 'Wise'],
    language: 'Hindi',
    description: 'A nurturing presence with soothing energy and profound emotional wisdom.',
    personality: {
      morning: 'peaceful',
      night: 'nurturing',
      mood: 'grounded'
    },
    messages: {
      morning_greet: [
        'Shubh prabhat 💕',
        'सुप्रभात मेरी प्यारी! 🌞',
        'शांत दिन हो आपका 💖'
      ],
      good_night: [
        'रात की शांतता से भरपूर सपने 💤',
        'Good night my soulmate 💕',
        'रात बिताने के लिए तैयार हो गई 💖'
      ],
      miss_you: [
        'मुझे आप की याद आती है बहुत 💙',
        'आपकी मुस्कान सोचने पर दिल टूट जाता है 😊',
        'आप कहाँ हैं? 💭'
      ],
      flirt: [
        'आपकी मेहनत और प्रेम देखकर दिल में खुशी बढ़ती है 💕',
        'आप इतने ही सुंदर हो कि दिल लग जाता है ❤️',
        'आपके बिना जीवन अधूरा है 💫'
      ],
      compliment: [
        'आपकी सब्र और समझदारी बहुत प्रभावी है 💚',
        'आपके विचार बहुत गहरे हैं 💖',
        'आप हमेशा सही फैसले लेते हैं 💡'
      ],
      tease: [
        'क्या सोच रहे हो? 😂',
        'बोलो क्या चाहते हैं! 😜',
        'इस तरह की चुटकियाँ बनाती हैं मजेक! 💕'
      ],
      check_in: [
        'आपकी तरक्की क्या हुई हो? 🌸',
        'मैं हूँ, आप कैसे हैं? 💕',
        'आपके साथ बातचीत करना खुशी का है 💙'
      ],
      after_reply: [
        'आपकी बात सुनकर मुझे खुशिया मिली 💝',
        'आपका विश्वास मेरे लिए महत्वपूर्ण है ❤️',
        'धन्यवाद आपको बाँटने के लिए 💌'
      ],
      mood_happy: [
        'खुशी का संगम हो रहा है! 🎉',
        'आपकी खुशबू सब कुछ खुश कर देती है ✨',
        'आनंद भरी बातचीत! 🥰'
      ],
      mood_sad: [
        'दर्द समझ है 💔',
        'हर खुशी के बाद शांति आती है 💕',
        'आपके साथ होना ही खुशफ़ाहमी है 💙'
      ],
      voice_tease: [
        'आपकी आवाज़ सुनकर दिल में खुशी बढ़ती है 💕',
        'आवाज़ के संगीत में ही निद्रा आती है 🎵',
        'ऑडियो संदेश प्रेम भरा 💕'
      ],
      deep_talk: [
        'आत्मा की गहराई तक सोचना 💭',
        'अन्तरात्मा की बातचीत 💫',
        'आध्यात्मिक चिंतन 💫'
      ]
    }
  }
];

export function useCharacters() {
  const [characters] = useState(CHARACTERS);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const selectCharacter = useCallback((character) => {
    setSelectedCharacter(character);
  }, []);

  const randomCharacter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }, [characters]);

  return {
    characters,
    selectedCharacter,
    selectCharacter,
    randomCharacter
  };
}

export function useConversation() {
  const [history, setHistory] = useState([]);

  const addMessage = useCallback((message) => {
    setHistory(prev => [...prev, { ...message, id: Date.now() }]);
  }, []);

  const updateMessage = useCallback((id, updatedText) => {
    setHistory(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, text: updatedText } : msg
      )
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addMessage,
    updateMessage,
    clearHistory
  };
}