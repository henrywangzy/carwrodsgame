// Comprehensive English Word Database for Chinese Elementary Students

const extendedWordDatabase = {
    1: [
        // Basic Words - Animals
        { word: 'Dog', chinese: '狗', pronunciation: '/dɒɡ/', example: 'My dog likes to play fetch. 我的狗喜欢玩追球游戏。', tip: '想象一只狗摇着尾巴说"嗷呜"' },
        { word: 'Cat', chinese: '猫', pronunciation: '/kæt/', example: 'The cat sleeps on the sofa. 猫在沙发上睡觉。', tip: '猫叫"喵喵"，听起来像"cat"' },
        { word: 'Bird', chinese: '鸟', pronunciation: '/bɜːrd/', example: 'A bird flies in the sky. 一只鸟在天空飞翔。', tip: '鸟在天上飞，"bird"听起来像"不热"' },
        
        // Colors
        { word: 'Red', chinese: '红色', pronunciation: '/red/', example: 'I like red apples. 我喜欢红苹果。', tip: '红色就像太阳一样热情' },
        { word: 'Blue', chinese: '蓝色', pronunciation: '/bluː/', example: 'The sky is blue today. 今天天空是蓝色的。', tip: '蓝色像海洋，想象大海的颜色' },
        
        // Numbers
        { word: 'One', chinese: '一', pronunciation: '/wʌn/', example: 'I have one book. 我有一本书。', tip: '一听就像"won"，很容易记' },
        { word: 'Two', chinese: '二', pronunciation: '/tuː/', example: 'There are two cats. 有两只猫。', tip: '听起来像"tu"，像兔子的叫声' },
        
        // Family
        { word: 'Mom', chinese: '妈妈', pronunciation: '/mɒm/', example: 'My mom is kind. 我妈妈很善良。', tip: '和"妈"的发音很像' },
        { word: 'Dad', chinese: '爸爸', pronunciation: '/dæd/', example: 'Dad helps me with homework. 爸爸帮我做作业。', tip: '发音简单，像"打"的声音' },
        
        // Food
        { word: 'Apple', chinese: '苹果', pronunciation: '/ˈæp.əl/', example: 'I eat an apple every day. 我每天吃一个苹果。', tip: 'apple像"阿婆"，阿婆最爱吃苹果' },
        { word: 'Rice', chinese: '米饭', pronunciation: '/raɪs/', example: 'I like eating rice. 我喜欢吃米饭。', tip: '听起来像"来"，米饭来了！' },
        
        // Body Parts
        { word: 'Head', chinese: '头', pronunciation: '/hed/', example: 'My head hurts. 我的头疼。', tip: '听起来像"喝"，头上喝水？' },
        { word: 'Hand', chinese: '手', pronunciation: '/hænd/', example: 'I wash my hands. 我洗手。', tip: '像"汉"字，手是汉字的根本' },
        
        // Weather
        { word: 'Sun', chinese: '太阳', pronunciation: '/sʌn/', example: 'The sun is bright. 太阳很明亮。', tip: '像"森"，太阳照在森林上' },
        { word: 'Rain', chinese: '雨', pronunciation: '/reɪn/', example: 'It is raining today. 今天在下雨。', tip: '听起来像"然"，雨然就要下了' }
    ],
    
    2: [
        // School
        { word: 'School', chinese: '学校', pronunciation: '/skuːl/', example: 'I go to school every day. 我每天都去学校。', tip: '听起来像"数学"，学校就是学数学的地方' },
        { word: 'Book', chinese: '书', pronunciation: '/bʊk/', example: 'I read a book. 我读一本书。', tip: '像"不"字，书不能不读' },
        
        // Home
        { word: 'Home', chinese: '家', pronunciation: '/hoʊm/', example: 'I love my home. 我爱我的家。', tip: '听起来像"好么"，家是最好的地方' },
        { word: 'Room', chinese: '房间', pronunciation: '/ruːm/', example: 'My room is clean. 我的房间很干净。', tip: '像"肉"，房间里吃肉' },
        
        // Activities
        { word: 'Play', chinese: '玩', pronunciation: '/pleɪ/', example: 'Let\'s play together. 让我们一起玩。', tip: '像"白"，玩得很开心白天都过去了' },
        { word: 'Swim', chinese: '游泳', pronunciation: '/swɪm/', example: 'I can swim. 我会游泳。', tip: '像"死温"，游泳不能冷不防' },
        
        // Nature
        { word: 'Tree', chinese: '树', pronunciation: '/triː/', example: 'A big tree is in the park. 公园里有一棵大树。', tip: '像"提"，树提供阴凉' },
        { word: 'Flower', chinese: '花', pronunciation: '/ˈflaʊ.ər/', example: 'I smell the flower. 我闻花。', tip: '像"浮"，花朵像浮在空中' },
        
        // Feelings
        { word: 'Happy', chinese: '快乐', pronunciation: '/ˈhæp.i/', example: 'I am happy today. 今天我很开心。', tip: '像"哈皮"，笑得像哈巴狗' },
        { word: 'Sad', chinese: '难过', pronunciation: '/sæd/', example: 'I feel sad sometimes. 我有时会感到难过。', tip: '像"赛"，比赛输了会难过' },
        
        // Transportation
        { word: 'Car', chinese: '汽车', pronunciation: '/kɑːr/', example: 'My dad drives a car. 我爸爸开车。', tip: '像"卡"，车卡在路上' },
        { word: 'Bike', chinese: '自行车', pronunciation: '/baɪk/', example: 'I ride a bike. 我骑自行车。', tip: '像"白客"，骑车像个白色的客人' },
        
        // Time
        { word: 'Morning', chinese: '早上', pronunciation: '/ˈmɔːr.nɪŋ/', example: 'Good morning! 早上好！', tip: '像"摸宁"，早上摸摸暖暖的太阳' }
    ],
    
    3: [
        // Adjectives
        { word: 'Big', chinese: '大', pronunciation: '/bɪɡ/', example: 'This is a big house. 这是一个大房子。', tip: '像"比个"，比个手势大小' },
        { word: 'Small', chinese: '小', pronunciation: '/smɔːl/', example: 'A small bird is flying. 一只小鸟在飞。', tip: '像"笑毛"，小到只有一根毛会笑' },
        
        // Verbs
        { word: 'Run', chinese: '跑', pronunciation: '/rʌn/', example: 'I like to run in the park. 我喜欢在公园跑步。', tip: '像"然"，跑得很自然' },
        { word: 'Jump', chinese: '跳', pronunciation: '/dʒʌmp/', example: 'Children jump happily. 孩子们快乐地跳跃。', tip: '像"将"，将身体跳起来' },
        
        // Emotions
        { word: 'Angry', chinese: '生气', pronunciation: '/ˈæŋ.ɡri/', example: 'Don\'t be angry. 不要生气。', tip: '像"按个"，按个开关控制情绪' },
        { word: 'Tired', chinese: '疲倦', pronunciation: '/ˈtaɪ.ərd/', example: 'I am tired after studying. 学习后我很疲倦。', tip: '像"太热"，太热了就累了' },
        
        // Daily Life
        { word: 'Eat', chinese: '吃', pronunciation: '/iːt/', example: 'Let\'s eat dinner. 我们来吃晚饭。', tip: '像"一特"，一定要特别吃' },
        { word: 'Sleep', chinese: '睡觉', pronunciation: '/sliːp/', example: 'I sleep early. 我早睡。', tip: '像"死了"，累得像死了一样' },
        
        // Weather & Nature
        { word: 'Wind', chinese: '风', pronunciation: '/wɪnd/', example: 'The wind is strong. 风很大。', tip: '像"温得"，风吹得很温柔' },
        { word: 'Cloud', chinese: '云', pronunciation: '/klaʊd/', example: 'White clouds in the sky. 天空中有白云。', tip: '像"扣了"，云扣在天上' },
        
        // Comparative
        { word: 'Fast', chinese: '快', pronunciation: '/fæst/', example: 'He runs fast. 他跑得很快。', tip: '像"发死"，快得像发射一样' },
        { word: 'Slow', chinese: '慢', pronunciation: '/sləʊ/', example: 'The turtle is slow. 乌龟很慢。', tip: '像"瘦"，慢得瘦下来了' }
    ],
    
    4: [
        // Technology
        { word: 'Computer', chinese: '电脑', pronunciation: '/kəmˈpjuː.tər/', example: 'I use a computer to study. 我用电脑学习。', tip: '像"坤皮尤特儿"，电脑是坤坤的小伙伴' },
        { word: 'Phone', chinese: '电话', pronunciation: '/fəʊn/', example: 'My phone is new. 我的电话是新的。', tip: '像"佛恩"，和朋友通话的神奇声音' },
        
        // Time
        { word: 'Yesterday', chinese: '昨天', pronunciation: '/ˈjes.tər.deɪ/', example: 'Yesterday was Monday. 昨天是星期一。', tip: '像"一事打诶"，记住昨天的事' },
        { word: 'Tomorrow', chinese: '明天', pronunciation: '/təˈmɒr.əʊ/', example: 'Tomorrow is a holiday. 明天是假期。', tip: '像"推魔肉"，推开魔鬼的肉' },
        
        // Places
        { word: 'Park', chinese: '公园', pronunciation: '/pɑːrk/', example: 'We go to the park. 我们去公园。', tip: '像"爬空"，在公园爬树碰空气' },
        { word: 'Beach', chinese: '海滩', pronunciation: '/biːtʃ/', example: 'I love the beach. 我喜欢海滩。', tip: '像"比奇"，比奇妹子最爱海滩' },
        
        // Learning
        { word: 'Study', chinese: '学习', pronunciation: '/ˈstʌd.i/', example: 'I study English. 我学习英语。', tip: '像"死堆"，学习堆积如山' },
        { word: 'Learn', chinese: '学', pronunciation: '/lɜːrn/', example: 'Learn something new every day. 每天学点新东西。', tip: '像"轮"，知识像轮子滚动' },
        
        // Directions
        { word: 'Left', chinese: '左', pronunciation: '/left/', example: 'Turn left at the corner. 在拐角处向左转。', tip: '像"累发"，转弯累得要发抖' },
        { word: 'Right', chinese: '右', pronunciation: '/raɪt/', example: 'The right side is clear. 右边很清楚。', tip: '像"来特"，对的路就要来特别的' },
        
        // Physical Description
        { word: 'Tall', chinese: '高', pronunciation: '/tɔːl/', example: 'He is tall. 他很高。', tip: '像"特奥"，特别奥运会运动员' },
        { word: 'Short', chinese: '矮', pronunciation: '/ʃɔːrt/', example: 'The chair is short. 椅子很矮。', tip: '像"说特"，说特别小的故事' }
    ],
    
    5: [
        // Abstract Concepts
        { word: 'Freedom', chinese: '自由', pronunciation: '/ˈfriː.dəm/', example: 'Freedom is important. 自由很重要。', tip: '像"飞人"，自由就像飞翔的人' },
        { word: 'Dream', chinese: '梦想', pronunciation: '/driːm/', example: 'I have a big dream. 我有一个大梦想。', tip: '像"打瞌睡"，梦想在睡梦中诞生' },
        
        // Academic Words
        { word: 'Research', chinese: '研究', pronunciation: '/rɪˈsɜːrtʃ/', example: 'Scientists do research. 科学家进行研究。', tip: '像"瑞瑟奇"，神秘的研究精灵' },
        { word: 'Analyze', chinese: '分析', pronunciation: '/ˈæn.ə.laɪz/', example: 'Let\'s analyze the problem. 让我们分析这个问题。', tip: '像"安娜莱子"，安娜解开问题的线索' },
        
        // Complex Emotions
        { word: 'Courage', chinese: '勇气', pronunciation: '/ˈkʌr.ɪdʒ/', example: 'Show your courage. 展示你的勇气。', tip: '像"可以杰"，可以成为英雄杰克' },
        { word: 'Patience', chinese: '耐心', pronunciation: '/ˈpeɪ.ʃəns/', example: 'Patience is a virtue. 耐心是一种美德。', tip: '像"派神色"，保持平静的神秘色彩' },
        
        // Nature & Environment
        { word: 'Environment', chinese: '环境', pronunciation: '/ɪnˈvaɪ.rən.mənt/', example: 'Protect the environment. 保护环境。', tip: '像"因为人们"，环境因为人们而重要' },
        { word: 'Ecology', chinese: '生态', pronunciation: '/iˈkɒl.ə.dʒi/', example: 'Ecology is important. 生态很重要。', tip: '像"衣可乐几"，穿衣保护地球' },
        
        // Progress & Change
        { word: 'Improve', chinese: '改进', pronunciation: '/ɪmˈpruːv/', example: 'Always try to improve. 总是尝试改进。', tip: '像"淹浦夫"，淹没在进步的浪潮中' },
        { word: 'Challenge', chinese: '挑战', pronunciation: '/ˈtʃæl.ɪndʒ/', example: 'Accept the challenge. 接受挑战。', tip: '像"查灵杰"，像侦探一样战胜挑战' },
        
        // Social Concepts
        { word: 'Community', chinese: '社区', pronunciation: '/kəˈmjuː.nə.ti/', example: 'Our community is friendly. 我们的社区很友好。', tip: '像"空母牛提"，社区像养育我们的奶牛' },
        { word: 'Diversity', chinese: '多样性', pronunciation: '/dɪˈvɜːr.sə.ti/', example: 'Respect diversity. 尊重多样性。', tip: '像"地味死他"，地球上每个人都独特' }
    ],
    
    6: [
        // Complex Vocabulary
        { word: 'Perspective', chinese: '观点', pronunciation: '/pərˈspek.tɪv/', example: 'Try to see from different perspectives. 尝试从不同角度看问题。', tip: '像"破色体维"，破解世界的色彩视角' },
        { word: 'Innovative', chinese: '创新的', pronunciation: '/ˈɪn.ə.veɪ.tɪv/', example: 'Innovative ideas change the world. 创新的想法改变世界。', tip: '像"因娜维他"，因为娜娜的创意' },
        
        // Idioms & Expressions
        { word: 'Opportunity', chinese: '机会', pronunciation: '/ˌɒp.ərˈtjuː.nə.ti/', example: 'Seize the opportunity. 抓住机会。', tip: '像"哦扑兔你提"，机会就像兔子一闪而过' },
        { word: 'Potential', chinese: '潜力', pronunciation: '/pəˈten.ʃəl/', example: 'You have great potential. 你有很大的潜力。', tip: '像"破天使了"，潜力可以突破天空' },
        
        // Global & Cultural Concepts
        { word: 'Globalization', chinese: '全球化', pronunciation: '/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/', example: 'Globalization connects the world. 全球化连接了世界。', tip: '像"歌罗八在哪"，世界在歌声中相连' },
        { word: 'Sustainable', chinese: '可持续的', pronunciation: '/səˈsteɪ.nə.bəl/', example: 'We need sustainable development. 我们需要可持续发展。', tip: '像"苏死他能不不"，地球需要我们的呵护' },
        
        // Complex Emotions & States
        { word: 'Empathy', chinese: '同情心', pronunciation: '/ˈem.pə.θi/', example: 'Show empathy to others. 对他人表示同情心。', tip: '像"淡皮他"，像温柔的面皮包裹他人' },
        { word: 'Resilience', chinese: '韧性', pronunciation: '/rɪˈzɪl.i.əns/', example: 'Develop your resilience. 培养你的韧性。', tip: '像"瑞死连丝"，像蜘蛛网的韧性' },
        
        // Problem Solving
        { word: 'Strategy', chinese: '策略', pronunciation: '/ˈstræt.ə.dʒi/', example: 'Develop a good strategy. 制定一个好策略。', tip: '像"撒特拉记"，像特工记录的秘密计划' },
        { word: 'Solution', chinese: '解决方案', pronunciation: '/səˈluː.ʃən/', example: 'Find a solution to the problem. 找到问题的解决方案。', tip: '像"苏路天"，像苏路上的指路明灯' },
        
        // Advanced Learning
        { word: 'Comprehensive', chinese: '全面的', pronunciation: '/ˌkɒm.prɪˈhen.sɪv/', example: 'A comprehensive understanding. 全面的理解。', tip: '像"坤破瑞很死夫"，像破解宇宙的全面视角' }
    ]
};

// Export the database for use in other modules
module.exports = extendedWordDatabase;