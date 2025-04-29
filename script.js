/**
 * Nigeria Election Poll - Main JavaScript File
 *
 * Handles UI interactions, data management, chart rendering,
 * i18n, client-side hashing, and communication with Wix parent page.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- i18n (Internationalization) Setup ---
    const L10N = {
        en: {
            // Navigation & Titles
            navSelectCandidates: 'Select Candidates', navVote: 'Vote', navResults: 'Results', navPopularity: 'Popularity', navComments: 'Comments',
            mainHeading: '2027 Nigeria Election Poll', presidentTitle: 'President', vpTitle: 'Vice President',
            resultsChartTitle: 'Live Vote Standings', resultsComboTitle: 'Popular Candidate Pairings', loyalistTitle: 'Top Combo Influencers',
            mapTitle: 'Most Voted Combo Per State', pieTitle: 'Overall Combo Popularity', commentsTitle: 'Comments',
            contactLightboxTitle: 'Contact / Add Candidate', referralLightboxTitle: 'Request Influencer Code',
            // Subtitles & Descriptions
            subHeading: 'Select your preferred President and Vice President. Your vote is securely recorded and contributes to the live, transparent results. Use a referral code to support an influencer!',
            presidentSubtitle: 'Click a candidate to select. Click again or choose another to change.',
            vpSubtitle: 'Click a candidate to select. Click again or choose another to change.',
            resultsChartSubtitle: 'Overall results based on submitted votes. Bars represent percentage of the top combo.',
            resultsComboSubtitle: 'Click a combo card to view/add comments for that specific pairing.',
            mapSubtitle: 'Hover over a state to see its leading combo based on votes cast within that state.',
            pieSubtitle: 'Distribution of votes across all submitted combinations.',
            // Buttons & Actions
            voteButton: 'Vote', likeButtonTip: 'Like this candidate', shareButtonTip: 'Share this combo',
            referralButton: 'Request Influencer Code', contactButton: 'Contact / Add Candidate',
            commentPostButton: 'Post Comment', replyButton: 'Post Reply', contactSubmitButton: 'Submit Inquiry', referralSubmitButton: 'Request Code',
            // Form Labels & Placeholders
            labelName: 'Name (required)', labelPhone: 'Phone (required)', labelState: 'State (required)', labelCity: 'City (required)',
            labelGender: 'Gender (required)', labelAge: 'Age (18+)', labelReferral: 'Referral Code', labelCommentName: 'Your Name', labelCommentText: 'Your Comment',
            selectState: 'Select State', selectCity: 'Select City', selectGender: 'Select Gender',
            contactLabelName: 'Full Name (required)', contactLabelPhone: 'Phone Number', contactLabelEmail: 'Email Address', contactLabelMessage: 'Your Question / Candidate Info',
            referralLabelName: 'Your Name (required)', referralLabelContact: 'Phone or Email (required)',
            // Status & Messages
            voteEnds: 'Poll Ends', voteSecurityInfo: '🔒 Your vote is confidential and securely timestamped using cryptographic hashing for integrity.',
            commentPolicy: 'Your comment will be publicly visible. Please be respectful.',
            voteSuccessTitle: 'Vote Successfully Recorded!', voteSuccessDetails: 'Your selection for {combo} has been securely submitted.', voteHashLabel: 'Vote Integrity Hash (Simulated):',
            contactSuccessMessage: 'Thanks! We will be in touch soon.', referralSuccessMessage: 'Thanks! Your request has been submitted. We\'ll process it shortly.',
            referralFeeInfo: 'The fee to get a code and be part of this leadership poll is non-refundable N1,000,000. Share it to climb the leaderboard!',
            legendText: 'Legend: NC, NE, NW, SW, SE, SS (North Central, North East, North West, South West, South East, South-South).',
            noVotesChart: 'No votes recorded yet.', noCombosGrid: 'No combinations voted for yet.', noLoyalists: 'No loyalist data available yet.', noComments: 'Be the first to comment on this combo!', noPieData: 'No votes yet to display popularity.', mapNoData: 'No voting data available',
            // Tooltips
            tipCompleteFields: 'Complete all required fields above and select candidates to enable voting.',
            tipReferralCode: 'Optional: Enter code if someone referred you. Helps track influence.',
            tipAgeRequirement: 'Must be 18 or older to participate.',
            tipInfluencerInfo: 'Users ranked by the number of voters they referred for specific President/VP pairings using their unique code.',
            tipContact: 'Questions or additions? Click here.',
            tipReferralInfo: 'Share your unique code. Every vote using it boosts your rank for your chosen combo. A fee applies for code generation.',
            tipSecureVote: 'Uses secure HTTPS connection for all data transmission.',
            tipVoteIntegrity: 'Each vote generates a unique, verifiable submission ID (client-side hash for demonstration).',
            tipSimulationInfo: 'This is a gamified polling simulation for demonstration purposes.',
            // Errors
            errorSelectCandidates: 'Please select both a President and a Vice President.',
            errorSameCandidate: 'President and Vice President cannot be the same person.',
            errorFillFields: 'Please ensure all voter information fields are filled correctly.',
            errorCommentFields: 'Please enter name and comment.',
            errorReplyFields: 'Please enter name and reply.',
            errorContactFields: 'Please fill out all contact form fields correctly!',
            errorReferralFields: 'Please enter your name and phone/email.',
            errorShareAPI: 'Sharing failed or was cancelled.',
            errorClipboardCopy: 'Failed to copy sharing info.',
            errorMapLoad: 'Error loading map. Please refresh.',
            errorPieLoad: 'Error loading popularity chart.',
            errorOperationFailed: 'Operation failed: {message}',
            errorUnknown: 'Unknown error',
        },
        ha: { // Hausa Translations (Example - Needs verification)
            navSelectCandidates: 'Zaɓi \'Yan Takara', navVote: 'Kaɗa Ƙuri\'a', navResults: 'Sakamako', navPopularity: 'Shahara', navComments: 'Sharhi',
            mainHeading: 'Zaɓen Nijeriya 2027 Poll', presidentTitle: 'Shugaban Ƙasa', vpTitle: 'Mataimakin Shugaban Ƙasa',
            resultsChartTitle: 'Matsayin Zaɓe Kai Tsaye', resultsComboTitle: 'Haɗin \'Yan Takara Masu Shahara', loyalistTitle: 'Manyan Masu Tasiri na Haɗi',
            mapTitle: 'Haɗin da Aka Fi Zaɓa a Kowace Jiha', pieTitle: 'Rarraba Shaharar Haɗi', commentsTitle: 'Sharhi',
            contactLightboxTitle: 'Tuntuɓa / Ƙara Dan Takara', referralLightboxTitle: 'Nemi Lambar Turawa',
            subHeading: 'Zaɓi Shugaban Ƙasa da Mataimakin da kake so. Ana rikodin ƙuri\'arka cikin aminci kuma tana ba da gudummawa ga sakamako kai tsaye. Yi amfani da lambar turawa idan an ba ka!',
            presidentSubtitle: 'Danna kan dan takara don zaɓa.', vpSubtitle: 'Danna kan dan takara don zaɓa.',
            resultsChartSubtitle: 'Sakamako gabaɗaya bisa ƙuri\'un da aka kaɗa.', resultsComboSubtitle: 'Danna katin haɗi don duba/ƙara sharhi.',
            mapSubtitle: 'Matsa linzamin kwamfuta kan jiha don ganin babban haɗinta.', pieSubtitle: 'Rarraba ƙuri\'u a duk haɗin da aka gabatar.',
            voteButton: 'Kaɗa Ƙuri\'a', likeButtonTip: 'So wannan dan takara', shareButtonTip: 'Raba wannan haɗi',
            referralButton: 'Nemi Lambar Tasiri', contactButton: 'Tuntuɓa / Ƙara Dan Takara',
            commentPostButton: 'Aika Sharhi', replyButton: 'Aika Amsa', contactSubmitButton: 'Aika Tambaya', referralSubmitButton: 'Nemi Lamba',
            labelName: 'Suna (wajibi)', labelPhone: 'Waya (wajibi)', labelState: 'Jiha (wajibi)', labelCity: 'Birni (wajibi)',
            labelGender: 'Jinsi (wajibi)', labelAge: 'Shekaru (18+)', labelReferral: 'Lambar Turawa', labelCommentName: 'Sunanka', labelCommentText: 'Sharhinka',
            selectState: 'Zaɓi Jiha', selectCity: 'Zaɓi Birni', selectGender: 'Zaɓi Jinsi',
            contactLabelName: 'Cikakken Suna (wajibi)', contactLabelPhone: 'Lambar Waya', contactLabelEmail: 'Adireshin Imel', contactLabelMessage: 'Tambayarka / Bayanin Dan Takara',
            referralLabelName: 'Sunanka (wajibi)', referralLabelContact: 'Waya ko Imel (wajibi)',
            voteEnds: 'Ƙuri\'a ta Ƙare', voteSecurityInfo: '🔒 Ana kiyaye ƙuri\'arka kuma an hatimce ta da lokaci ta amfani da hashing na cryptographic don mutunci.',
            commentPolicy: 'Za a ga sharhinka a fili. Da fatan za a girmama.',
            voteSuccessTitle: 'An Yi Nasarar Rikodin Ƙuri\'a!', voteSuccessDetails: 'An gabatar da zaɓinka na {combo} cikin aminci.', voteHashLabel: 'Hash Mutuncin Ƙuri\'a (Kwaikwayo):',
            contactSuccessMessage: 'Mun gode! Za mu tuntube ka nan ba da daɗewa ba.', referralSuccessMessage: 'Mun gode! An gabatar da buƙatarka.',
            referralFeeInfo: 'Kudin samun lamba shine N1,000,000 wanda ba za a iya mayarwa ba. Raba shi don hawa kan allo!',
            legendText: 'Maɓalli: NC, NE, NW, SW, SE, SS (Arewa Maso Tsakiya, Arewa Maso Gabas, Arewa Maso Yamma, Kudu Maso Yamma, Kudu Maso Gabas, Kudu Maso Kudu).',
            noVotesChart: 'Babu ƙuri\'un da aka rikodin tukuna.', noCombosGrid: 'Babu haɗin da aka zaɓa tukuna.', noLoyalists: 'Babu bayanan masu biyayya tukuna.', noComments: 'Kasance farkon mai sharhi!', noPieData: 'Babu ƙuri\'u tukuna don nuna shahara.', mapNoData: 'Babu bayanan zaɓe',
            tipCompleteFields: 'Cika dukkan filayen da ake buƙata kuma zaɓi \'yan takara don kunna zaɓe.',
            tipReferralCode: 'Na zaɓi: Shigar da lamba idan wani ya tura ka.',
            tipAgeRequirement: 'Dole ne ka cika shekaru 18 ko sama da haka.',
            tipInfluencerInfo: 'Masu amfani da aka jera ta yawan masu jefa ƙuri\'a da suka tura.',
            tipContact: 'Tambayoyi ko ƙari? Danna nan.',
            tipReferralInfo: 'Raba lambarka ta musamman. Kowane ƙuri\'a yana haɓaka matsayinka. Ana biyan kuɗi.',
            tipSecureVote: 'Yana amfani da haɗin HTTPS mai aminci.',
            tipVoteIntegrity: 'Kowace ƙuri\'a tana haifar da ID na musamman (hash na abokin ciniki don nunawa).',
            tipSimulationInfo: 'Wannan kwaikwayo ne na zaɓe don dalilai na nunawa.',
            errorSelectCandidates: 'Da fatan za a zaɓi Shugaban Ƙasa da Mataimaki.',
            errorSameCandidate: 'Shugaban Ƙasa da Mataimaki ba za su iya zama mutum ɗaya ba.',
            errorFillFields: 'Da fatan za a tabbatar an cika dukkan filayen masu jefa ƙuri\'a daidai.',
            errorCommentFields: 'Da fatan za a shigar da suna da sharhi.',
            errorReplyFields: 'Da fatan za a shigar da suna da amsa.',
            errorContactFields: 'Da fatan za a cika dukkan filayen tuntuɓa daidai!',
            errorReferralFields: 'Da fatan za a shigar da sunanka da waya/imel.',
            errorShareAPI: 'Rarrabawa ta gaza ko an soke.',
            errorClipboardCopy: 'An kasa kwafin bayanin rabawa.',
            errorMapLoad: 'Kuskuren loda taswira.',
            errorPieLoad: 'Kuskuren loda jadawalin shahara.',
            errorOperationFailed: 'Aiki ya gaza: {message}',
            errorUnknown: 'Kuskuren da ba a sani ba',
        },
        yo: { // Yoruba Translations (Example - Needs verification)
            navSelectCandidates: 'Yan Àwọn Olùdíje', navVote: 'Díbò', navResults: 'Àwọn Èsì', navPopularity: 'Gbajúgbajà', navComments: 'Àwọn Àlàyé',
            mainHeading: 'Ìdìbò Nàìjíríà 2027 Poll', presidentTitle: 'Ààrẹ', vpTitle: 'Igbákejì Ààrẹ',
            resultsChartTitle: 'Ìdúró Ìbò Live', resultsComboTitle: 'Àpapọ̀ Olùdíje Gbajúgbajà', loyalistTitle: 'Àwọn Alátìlẹ́yìn Àpapọ̀ Tó Ga Jùlọ',
            mapTitle: 'Àpapọ̀ Tí Wọ́n Dìbò Fún Jùlọ Ní Ìpínlẹ̀ Kọ̀ọ̀kan', pieTitle: 'Ìpín Gbajúgbajà Àpapọ̀', commentsTitle: 'Àwọn Àlàyé',
            contactLightboxTitle: 'Kàn sí Wa / Fi Olùdíje Kún', referralLightboxTitle: 'Béèrè Fún Koodu Ìtọ́kasí',
            subHeading: 'Yan Ààrẹ àti Igbákejì tí o fẹ́. A ṣe àkọsílẹ̀ ìbò rẹ ní ààbò, ó sì ṣe àfikún sí àwọn èsì tó hàn gbangba. Lo koodu ìtọ́kasí tí a bá fún ọ!',
            presidentSubtitle: 'Tẹ olùdíje láti yàn.', vpSubtitle: 'Tẹ olùdíje láti yàn.',
            resultsChartSubtitle: 'Àwọn èsì gbogboogbò dá lórí àwọn ìbò tí a fi sílẹ̀.', resultsComboSubtitle: 'Tẹ káàdì àpapọ̀ láti wo/fi àlàyé kún.',
            mapSubtitle: 'Gbé kọ́sọ̀ sórí ìpínlẹ̀ láti rí àpapọ̀ tó ga jùlọ.', pieSubtitle: 'Ìpín àwọn ìbò ní gbogbo àpapọ̀ tí a fi sílẹ̀.',
            voteButton: 'Díbò', likeButtonTip: 'Fẹ́ràn olùdíje yìí', shareButtonTip: 'Pín àpapọ̀ yìí',
            referralButton: 'Gba Koodu Alátìlẹ́yìn Rẹ', contactButton: 'Kàn sí Wa / Fi Olùdíje Kún',
            commentPostButton: 'Fi Àlàyé Ránṣẹ́', replyButton: 'Fi Èsì Ránṣẹ́', contactSubmitButton: 'Fi Ìbéèrè Ránṣẹ́', referralSubmitButton: 'Béèrè Fún Koodu',
            labelName: 'Orúkọ (dandan)', labelPhone: 'Fóònù (dandan)', labelState: 'Ìpínlẹ̀ (dandan)', labelCity: 'Ìlú (dandan)',
            labelGender: 'Akọ-abo (dandan)', labelAge: 'Ọjọ́ Orí (18+)', labelReferral: 'Koodu Ìtọ́kasí', labelCommentName: 'Orúkọ Rẹ', labelCommentText: 'Àlàyé Rẹ',
            selectState: 'Yan Ìpínlẹ̀', selectCity: 'Yan Ìlú', selectGender: 'Yan Akọ-abo',
            contactLabelName: 'Orúkọ Kíkún (dandan)', contactLabelPhone: 'Nọ́mbà Fóònù', contactLabelEmail: 'Adírẹ́sì Ímẹ́ẹ̀lì', contactLabelMessage: 'Ìbéèrè Rẹ / Àlàyé Olùdíje',
            referralLabelName: 'Orúkọ Rẹ (dandan)', referralLabelContact: 'Fóònù tàbí Ímẹ́ẹ̀lì (dandan)',
            voteEnds: 'Ìdìbò Ti Parí', voteSecurityInfo: '🔒 A pa ìbò rẹ mọ́, a sì fi àmì àkókò sí i ní ààbò pẹ̀lú lílo hashing cryptographic fún ìdúróṣinṣin.',
            commentPolicy: 'Gbogbo ènìyàn yóò rí àlàyé rẹ. Jọ̀wọ́ fi ọ̀wọ̀ hàn.',
            voteSuccessTitle: 'A Ti Gba Ìbò Rẹ Sílẹ̀ Pẹ̀lú Àṣeyọrí!', voteSuccessDetails: 'A ti fi ìyàn rẹ fún {combo} sílẹ̀ ní ààbò.', voteHashLabel: 'Hash Ìdúróṣinṣin Ìbò (Simulation):',
            contactSuccessMessage: 'Ó ṣeun! A ó kàn sí ọ láìpẹ́.', referralSuccessMessage: 'Ó ṣeun! A ti gba ìbéèrè rẹ.',
            referralFeeInfo: 'Owó láti gba koodu jẹ́ N1,000,000 tí kò ṣeé dá padà. Pín in láti gun orí pátákó olórí!',
            legendText: 'Ìtumọ̀: NC, NE, NW, SW, SE, SS (Àríwá Àárín, Àríwá Ìlà Oòrùn, Àríwá Ìwọ̀ Oòrùn, Gúúsù Ìwọ̀ Oòrùn, Gúúsù Ìlà Oòrùn, Gúúsù Gúúsù).',
            noVotesChart: 'Kò sí ìbò tí a tíì gbà sílẹ̀.', noCombosGrid: 'Kò sí àpapọ̀ tí a tíì dìbò fún.', noLoyalists: 'Kò sí dátà alátìlẹ́yìn síbẹ̀.', noComments: 'Jẹ́ ẹni àkọ́kọ́ láti sọ àlàyé!', noPieData: 'Kò sí ìbò síbẹ̀ láti fi gbajúgbajà hàn.', mapNoData: 'Kò sí dátà ìdìbò',
            tipCompleteFields: 'Parí gbogbo pápá tí a béèrè kí o sì yan àwọn olùdíje láti lè dìbò.',
            tipReferralCode: 'Àṣàyàn: Tẹ koodu tí ẹnìkan bá tọ́ka rẹ sí.',
            tipAgeRequirement: 'O gbọ́dọ̀ jẹ́ ọmọ ọdún 18 tàbí jù bẹ́ẹ̀ lọ.',
            tipInfluencerInfo: 'Àwọn oníṣe tí a tò lẹ́sẹẹsẹ nípasẹ̀ iye àwọn adíbò tí wọ́n tọ́ka.',
            tipContact: 'Ìbéèrè tàbí àfikún? Tẹ ibí.',
            tipReferralInfo: 'Pín koodu àkànṣe rẹ. Gbogbo ìbò ń gbé ipò rẹ ga. Owó kan wà.',
            tipSecureVote: 'Ó nlo ìsopọ̀ HTTPS tí ó ní ààbò.',
            tipVoteIntegrity: 'Ìbò kọ̀ọ̀kan ń mú ID ìfisílẹ̀ jáde (hash oníbarà fún ìfihàn).',
            tipSimulationInfo: 'Èyí jẹ́ simulation ìdìbò fún ète ìfihàn.',
            errorSelectCandidates: 'Jọ̀wọ́ yan Ààrẹ àti Igbákejì.',
            errorSameCandidate: 'Ààrẹ àti Igbákejì kò le jẹ́ ẹni kan náà.',
            errorFillFields: 'Jọ̀wọ́ rí i dájú pé a kọ gbogbo pápá ìwífún adíbò ní déédéé.',
            errorCommentFields: 'Jọ̀wọ́ kọ orúkọ àti àlàyé.',
            errorReplyFields: 'Jọ̀wọ́ kọ orúkọ àti èsì.',
            errorContactFields: 'Jọ̀wọ́ kọ gbogbo pápá ìbánisọ̀rọ̀ ní déédéé!',
            errorReferralFields: 'Jọ̀wọ́ kọ orúkọ rẹ àti fóònù/ímẹ́ẹ̀lì.',
            errorShareAPI: 'Pípín kùnà tàbí a fagilé.',
            errorClipboardCopy: 'Kò lè ṣe àdàkọ ìwífún pípín.',
            errorMapLoad: 'Àṣìṣe nígbà tí a n gbé máàpù.',
            errorPieLoad: 'Àṣìṣe nígbà tí a n gbé ṣáàtì gbajúgbajà.',
            errorOperationFailed: 'Iṣẹ́ kùnà: {message}',
            errorUnknown: 'Àṣìṣe tí a kò mọ̀',
        },
        ig: { // Igbo Translations (Example - Needs verification)
            navSelectCandidates: 'Họrọ Ndị Na-azọ Ọkwa', navVote: 'Tụọ Vootu', navResults: 'Nsonaazụ', navPopularity: 'Ịma Ama', navComments: 'Okwu',
            mainHeading: 'Ntuli Aka Naijiria 2027 Poll', presidentTitle: 'Onye Isi Ala', vpTitle: 'Onye Nnochite Anya Onye Isi Ala',
            resultsChartTitle: 'Ọnọdụ Vootu Live', resultsComboTitle: 'Nchikota Ndị A Ma Ama', loyalistTitle: 'Ndị Kachasị Mmetụta Nchikota',
            mapTitle: 'Nchikota Kachasị Vootu na Steeti Ọ bụla', pieTitle: 'Nkewa Ịma Ama Nchikota', commentsTitle: 'Okwu',
            contactLightboxTitle: 'Kpọtụrụ / Tinye Onye Na-azọ Ọkwa', referralLightboxTitle: 'Rịọ Koodu Ntuziaka',
            subHeading: 'Họrọ Onye Isi Ala na Onye Nnochite Anya nke masịrị gị. A na-edekọ vootu gị na nzuzo ma na-atụnye ụtụ na nsonaazụ doro anya. Jiri koodu ntuziaka ma ọ bụrụ na enyere gị!',
            presidentSubtitle: 'Pịa onye na-azọ ọkwa ka ịhọrọ.', vpSubtitle: 'Pịa onye na-azọ ọkwa ka ịhọrọ.',
            resultsChartSubtitle: 'Nsonaazụ zuru oke dabere na vootu ndị e tinyere.', resultsComboSubtitle: 'Pịa kaadị nchikota ka ịlele/tinye okwu.',
            mapSubtitle: 'Bugharịa cursor n\'elu steeti ka ịhụ nchikota ya kachasị elu.', pieSubtitle: 'Nkewa vootu n\'ofe nchikota niile e tinyere.',
            voteButton: 'Tụọ Vootu', likeButtonTip: 'Dị ka onye a na-azọ ọkwa', shareButtonTip: 'Kee nchikota a',
            referralButton: 'Nweta Koodu Onye Mmetụta Gị', contactButton: 'Kpọtụrụ / Tinye Onye Na-azọ Ọkwa',
            commentPostButton: 'Tinye Okwu', replyButton: 'Tinye Azịza', contactSubmitButton: 'Tinye Ajụjụ', referralSubmitButton: 'Rịọ Koodu',
            labelName: 'Aha (chọrọ)', labelPhone: 'Ekwentị (chọrọ)', labelState: 'Steeti (chọrọ)', labelCity: 'Obodo (chọrọ)',
            labelGender: 'Okike (chọrọ)', labelAge: 'Afọ (18+)', labelReferral: 'Koodu Ntuziaka', labelCommentName: 'Aha Gị', labelCommentText: 'Okwu Gị',
            selectState: 'Họrọ Steeti', selectCity: 'Họrọ Obodo', selectGender: 'Họrọ Okike',
            contactLabelName: 'Aha Zuru Ezu (chọrọ)', contactLabelPhone: 'Nọmba Ekwentị', contactLabelEmail: 'Adreesị Email', contactLabelMessage: 'Ajụjụ Gị / Ozi Onye Na-azọ Ọkwa',
            referralLabelName: 'Aha Gị (chọrọ)', referralLabelContact: 'Ekwentị ma ọ bụ Email (chọrọ)',
            voteEnds: 'Ntuli Aka Agwụla', voteSecurityInfo: '🔒 A na-echekwa vootu gị na nzuzo ma jiri cryptographic hashing mee ya akara oge maka iguzosi ike n\'ezi ihe.',
            commentPolicy: 'A ga-ahụ okwu gị n\'ihu ọha. Biko sọpụrụ.',
            voteSuccessTitle: 'Edekọla Vootu nke Ọma!', voteSuccessDetails: 'Enyefela nhọrọ gị maka {combo} na nzuzo.', voteHashLabel: 'Hash Iguzosi Ike n\'Ezi Ihe Vootu (Simulation):',
            contactSuccessMessage: 'Daalụ! Anyị ga-akpọtụrụ gị n\'oge na-adịghị anya.', referralSuccessMessage: 'Daalụ! Enyefela arịrịọ gị.',
            referralFeeInfo: 'Ụgwọ iji nweta koodu bụ N1,000,000 anaghị akwụghachi. Kee ya ka ị rịgoro n\'elu bọọdụ ndu!',
            legendText: 'Nkọwa: NC, NE, NW, SW, SE, SS (North Central, North East, North West, South West, South East, South-South).',
            noVotesChart: 'Onwebeghị vootu edekọrọ.', noCombosGrid: 'Onwebeghị nchikota a tụrụ vootu.', noLoyalists: 'Onwebeghị data onye nkwado.', noComments: 'Bụrụ onye mbụ ịza okwu!', noPieData: 'Onwebeghị vootu iji gosi ịma ama.', mapNoData: 'Onwebeghị data vootu',
            tipCompleteFields: 'Mezue oghere niile achọrọ ma họrọ ndị na-azọ ọkwa iji mee ka ịtụ vootu kwe omume.',
            tipReferralCode: 'Nhọrọ: Tinye koodu ma ọ bụrụ na mmadụ tụrụ gị aka.',
            tipAgeRequirement: 'Ị ga-adịrịrị afọ 18 ma ọ bụ karịa.',
            tipInfluencerInfo: 'Ndị ọrụ a haziri site n\'ọnụ ọgụgụ ndị votu ha tụrụ aka.',
            tipContact: 'Ajụjụ ma ọ bụ mgbakwunye? Pịa ebe a.',
            tipReferralInfo: 'Kee koodu gị pụrụ iche. Vootu ọ bụla na-ebuli ọkwa gị. A na-akwụ ụgwọ.',
            tipSecureVote: 'Na-eji njikọ HTTPS echekwara.',
            tipVoteIntegrity: 'Vootu ọ bụla na-ewepụta ID ntinye pụrụ iche (hash onye ahịa maka ngosi).',
            tipSimulationInfo: 'Nke a bụ simulation ntuli aka maka ebumnuche ngosi.',
            errorSelectCandidates: 'Biko họrọ ma Onye Isi Ala ma Onye Nnochite Anya.',
            errorSameCandidate: 'Onye Isi Ala na Onye Nnochite Anya enweghị ike ịbụ otu onye.',
            errorFillFields: 'Biko hụ na ejupụtara oghere ozi onye votu niile nke ọma.',
            errorCommentFields: 'Biko tinye aha na okwu.',
            errorReplyFields: 'Biko tinye aha na azịza.',
            errorContactFields: 'Biko jupụta oghere kọntaktị niile nke ọma!',
            errorReferralFields: 'Biko tinye aha gị na ekwentị/email.',
            errorShareAPI: 'Ịkekọrịta dara ma ọ bụ kagbuo ya.',
            errorClipboardCopy: 'O meghị nke ọma idetuo ozi nkekọrịta.',
            errorMapLoad: 'Njehie ibudata maapụ.',
            errorPieLoad: 'Njehie ibudata chaatị ịma ama.',
            errorOperationFailed: 'Ọrụ dara: {message}',
            errorUnknown: 'Njehie amaghị',
        },
    };
    let currentLang = 'en'; // Default language

    // Translation helper function
    const t = (key, params = {}) => {
        let text = L10N[currentLang]?.[key] || L10N['en']?.[key] || key; // Fallback to English, then key
        for (const param in params) {
            text = text.replace(`{${param}}`, params[param]);
        }
        return text;
    };

    // Function to update all translatable UI elements
    const updateUITranslations = () => {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            const text = t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder !== text) el.placeholder = text;
            } else if (el.tagName === 'OPTION' && el.value === "") {
                 if (el.textContent !== text) el.textContent = text;
            }
             else {
                 if (el.innerHTML !== text) el.innerHTML = text; // Use innerHTML to allow icons/tags if needed
            }
        });
        // Update tooltips
         document.querySelectorAll('[data-tip]').forEach(el => {
             const tipKey = `tip${el.id.charAt(0).toUpperCase() + el.id.slice(1)}`; // Heuristic for tooltip keys
             const tipText = t(tipKey) || t(el.dataset.tipKey) || el.getAttribute('data-tip'); // Try different ways to find key
             if(tipText && tipText !== key) { // Only update if a translation exists
                el.setAttribute('data-tip', tipText);
             }
         });
         // Special cases like countdown label
         const countdownTimer = getEl('countdownTimer');
         if(countdownTimer) countdownTimer.dataset.label = t('voteEnds'); // Keep updating label for countdown func

         // Update chart titles if charts exist (check needed as they might not be initialized yet)
         // Example: if (mapChart) mapChart.set("tooltipText", t('mapTooltip'));
         // Note: Updating chart labels/tooltips might require re-rendering or specific chart API calls.
    };

    // --- DOM Element References (using a helper for null checks) ---
    const getEl = (id) => document.getElementById(id);

    const presidentListEl = getEl('presidentList');
    const vicePresidentListEl = getEl('vicePresidentList');
    const voteBtn = getEl('voteBtn');
    const buttonFillEl = getEl('buttonFill');
    const chartBarsEl = getEl('chartBars');
    const loyalistCombosEl = getEl('loyalistCombosContainer');
    const comboGridEl = getEl('comboGrid');
    const voterNameEl = getEl('voterName');
    const voterPhoneEl = getEl('voterPhone');
    const voterStateEl = getEl('voterState');
    const voterCityEl = getEl('voterCity');
    const voterGenderEl = getEl('voterGender');
    const voterAgeEl = getEl('voterAge');
    const voterReferralEl = getEl('voterReferral');
    const comboCommentSection = getEl('commentsSection');
    const comboCommentTitle = getEl('comboCommentTitle');
    const comboCommentName = getEl('comboCommentName');
    const comboCommentText = getEl('comboCommentText');
    const comboCommentPostBtn = getEl('comboCommentPostBtn');
    const comboCommentListEl = getEl('comboCommentList');
    const contactUsBtn = getEl('contactUsBtn');
    const lightboxOverlay = getEl('lightboxOverlay');
    const lightboxClose = getEl('lightboxClose');
    const lightboxForm = getEl('lightboxForm');
    const contactFullNameEl = getEl('contactFullName');
    const contactPhoneEl = getEl('contactPhone');
    const contactEmailEl = getEl('contactEmail');
    const contactMessageEl = getEl('contactMessage');
    const lightboxSubmitMsg = getEl('lightboxSubmitMsg');
    const mobileMenuBtn = getEl('mobileMenuBtn');
    const mobileNavPanel = getEl('mobileNavPanel');
    const mobileNavCloseBtn = mobileNavPanel?.querySelector('.menu-close-btn');
    const getReferralCodeBtn = getEl('getReferralCodeBtn');
    const referralLightbox = getEl('referralLightbox');
    const referralLightboxClose = getEl('referralLightboxClose');
    const referralRequestForm = getEl('referralRequestForm');
    const referralNameEl = getEl('referralName');
    const referralContactEl = getEl('referralContact');
    const referralSubmitMsg = getEl('referralSubmitMsg');
    const wikiLightbox = getEl('wikiLightbox');
    const wikiIframe = getEl('wikiIframe');
    const wikiCloseBtn = getEl('wikiLightboxClose');
    const langPicker = getEl('langPicker');
    const voteConfirmationDiv = getEl('voteConfirmation');
    const voteHashValueEl = getEl('voteHashValue');
    const countdownTimerEl = getEl('countdownTimer');
    const popularityPieEl = getEl('popularityPie');
    const nigeriaMapEl = getEl('nigeriaMap');

    // --- Global State Variables ---
    let candidates = [];
    let candidateImages = {};
    let candidateDetails = {};
    let candidateLikes = {};
    let votesData = {}; // { "Pres & VP": count }
    let comboComments = {}; // { "Pres & VP": [ { id, name, text, parentID, replies:[] } ] }
    let loyalists = {}; // { "REFCODE": { loyalistName, city, combo, supporters, ... } }
    let mapStatesData = []; // Raw data for map from Wix/CMS
    let selectedPresident = null;
    let selectedVP = null;
    let currentCombo = null; // For comments section
    let countdownInterval = null; // To store interval ID

    // amCharts instances
    let mapChart = null;
    let polygonSeries = null;
    let pieRoot = null;
    let currentPieChart = null; // Renamed from pieChart to avoid conflict

    // --- Helper Functions ---

    /** Formats large numbers into K (thousands) or M (millions) */
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        return String(num);
    }

    /** Sets a fallback image if the original fails to load */
    function imageError(imgElement) {
        if (imgElement) {
            imgElement.onerror = null; // Prevent infinite loops
            imgElement.src = 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
        }
    }

    /** Generates a simple placeholder referral code */
    function generateReferralCode() {
        return "REF" + Math.floor(Math.random() * 90000 + 10000);
    }

    /** Displays flying heart animation from click event coordinates */
    function showHeartBlast(event) {
        const numHearts = 8;
        const duration = 1200; // ms
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('span');
            heart.classList.add('heart-particle');
            heart.textContent = '♥'; // Heart symbol
            const x = event.clientX;
            const y = event.clientY;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            // Randomize trajectory
            const randomX = (Math.random() - 0.5) * 120; // Horizontal spread
            const randomY = -70 - Math.random() * 60; // Upward movement
            heart.style.setProperty('--tx', `${randomX}px`);
            heart.style.setProperty('--ty', `${randomY}px`);
            document.body.appendChild(heart);
            // Remove the heart after animation ends
            setTimeout(() => { heart.remove(); }, duration);
        }
    }

     /** Sets loading state for buttons with spinners */
     function setButtonLoading(buttonElement, isLoading) {
        if (!buttonElement) return;
        const textSpan = buttonElement.querySelector('.btn-text, .vote-text'); // Find text span
        if (isLoading) {
            buttonElement.classList.add('loading');
            buttonElement.disabled = true;
            if (textSpan) textSpan.style.visibility = 'hidden'; // Hide text
        } else {
            buttonElement.classList.remove('loading');
            buttonElement.disabled = false;
            if (textSpan) textSpan.style.visibility = 'visible'; // Show text
        }
    }

    /** Async function to calculate SHA-256 hash of a string */
    async function sha256hex(str) {
        try {
            const buffer = new TextEncoder().encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        } catch (error) {
            console.error("Hashing failed:", error);
            return "hashing_error"; // Return a placeholder on error
        }
    }

    // --- Countdown Timer Logic ---
    function startCountdown() {
        const countdownEl = countdownTimerEl;
        if (!countdownEl) return;

        // Example End Time: 3 days, 2 hours, 3 minutes, 45 seconds from now
        // Replace this with the actual end date/time from your data source
        const endMs = Date.now() + (3 * 24 * 60 * 60 + 2 * 60 * 60 + 3 * 60 + 45) * 1000;

        const update = () => {
            const current = Date.now();
            const diff = endMs - current;

            if (diff <= 0) {
                countdownEl.textContent = t('voteEnds') + ": Ended!"; // Use translated label
                if (countdownInterval) clearInterval(countdownInterval);
                // Optionally disable voting here
                if(voteBtn) voteBtn.disabled = true;
                return;
            }

            let s = Math.floor(diff / 1000);
            let d = Math.floor(s / 86400); s %= 86400;
            let h = Math.floor(s / 3600); s %= 3600;
            let m = Math.floor(s / 60); s %= 60;

            // Use translated label from data attribute
            countdownEl.textContent = `${countdownEl.dataset.label || 'Poll Ends'}: ${d}d ${h}h ${m}m ${s}s`;
        };

        if (countdownInterval) clearInterval(countdownInterval); // Clear previous interval if any
        countdownInterval = setInterval(update, 1000);
        update(); // Initial call
    }

    // --- Wikipedia Lightbox ---
    function showWikiLightbox(candidateName) {
        if (!wikiLightbox || !wikiIframe) return;
        const link = wikiLinks[candidateName] || "about:blank"; // Use stored links
        wikiIframe.src = link;
        wikiLightbox.style.display = 'flex';
        wikiLightbox.setAttribute('aria-hidden', 'false');
    }

    function closeWikiLightbox() {
        if (!wikiLightbox || !wikiIframe) return;
        wikiLightbox.style.display = 'none';
        wikiIframe.src = "about:blank"; // Clear iframe
         wikiLightbox.setAttribute('aria-hidden', 'true');
    }

    // --- Vote Button Progress & Validation ---
    function updateProgress() {
        if (!voteBtn || !buttonFillEl) return;

        const steps = 8; // Number of required fields + selections
        let done = 0;

        if (selectedPresident) done++;
        if (selectedVP) done++;
        if (voterNameEl?.value.trim()) done++;
        // Basic phone validation (starts with 0, 11 digits) - adjust if needed
        if (voterPhoneEl?.value && /^[0]\d{10}$/.test(voterPhoneEl.value)) done++;
        if (voterStateEl?.value) done++;
        if (voterCityEl?.value) done++;
        if (voterGenderEl?.value) done++;
        // Age validation (is a number >= 18)
        const ageVal = parseInt(voterAgeEl?.value.trim() || '0');
        if (ageVal >= 18) done++;

        const ratio = (steps > 0) ? (done / steps) * 100 : 0;
        buttonFillEl.style.width = `${ratio}%`;

        const canVote = (done === steps && selectedPresident !== selectedVP);

        if (canVote) {
            if (voteBtn.disabled) { // Only add bounce if it wasn't already enabled
                 voteBtn.classList.add('bounce');
            }
            voteBtn.disabled = false;
            voteBtn.setAttribute('data-tip', ''); // Clear tooltip when enabled
        } else {
            voteBtn.disabled = true;
            voteBtn.classList.remove('bounce');
            voteBtn.setAttribute('data-tip', t('tipCompleteFields')); // Set tooltip when disabled
        }
    }

    // --- Data Reading Functions (from hidden tables - Optional Fallback) ---
    // These functions parse data from hidden HTML tables if initial data isn't provided via Wix message.
    function readCandidateTable() {
        const tbl = getEl('candidateDataTable');
        if (!tbl) return false; // Indicate data wasn't read
        const tbody = tbl.querySelector('tbody');
        if (!tbody) return false;

        candidates = []; candidateImages = {}; candidateDetails = {}; candidateLikes = {}; // Reset
        tbody.querySelectorAll('tr').forEach(r => {
            const c = r.querySelectorAll('td');
            if (c.length >= 6) {
                const name = c[0].textContent.trim();
                const imgUrl = c[1].textContent.trim();
                // const religion = c[2].textContent.trim(); // If needed
                const age = c[3].textContent.trim();
                const zone = c[4].textContent.trim();
                const likes = parseInt(c[5].textContent.trim()) || 0;
                if (name) {
                    candidates.push(name);
                    candidateImages[name] = imgUrl || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
                    candidateDetails[name] = { age, zone };
                    candidateLikes[name] = likes;
                }
            }
        });
        console.log("Read candidates from table:", candidates.length);
        return true; // Indicate data was read
    }

    function readComboTable() {
        const tbl = getEl('comboDataTable');
         if (!tbl) return false;
        const tbody = tbl.querySelector('tbody');
        if (!tbody) return false;

        votesData = {}; // Reset
        tbody.querySelectorAll('tr').forEach(r => {
            const c = r.querySelectorAll('td');
            if (c.length >= 3) {
                const pres = c[0].textContent.trim();
                const vp = c[1].textContent.trim();
                const vt = parseInt(c[2].textContent.trim()) || 0;
                if (pres && vp) {
                    votesData[`${pres} & ${vp}`] = vt;
                }
            }
        });
         console.log("Read combos from table:", Object.keys(votesData).length);
        return true;
    }

    function readUserDataTable() {
        const tbl = getEl('userDataTable');
        if (!tbl) return false;
        const tbody = tbl.querySelector('tbody');
        if (!tbody) return false;

        let allComments = [];
        comboComments = {}; // Reset
        tbody.querySelectorAll('tr').forEach(r => {
            const c = r.querySelectorAll('td');
            // ID, Combo, ParentID, Name, Comment, [Phone, State, City, Gender, Age]
            if (c.length >= 5) {
                const id = c[0]?.textContent.trim() ?? `temp-${Date.now()}-${Math.random()}`; // Need an ID
                const combo = c[1]?.textContent.trim() ?? '';
                const pid = parseInt(c[2]?.textContent.trim() || '0');
                const nm = c[3]?.textContent.trim() || "Anonymous";
                const tx = c[4]?.textContent.trim() || "(No comment)";
                if (id && combo) {
                    allComments.push({
                        id: id, comboKey: combo, parentID: pid, name: nm, text: tx, replies: []
                    });
                }
            }
        });

        // Build hierarchy
        let commentsById = {};
        allComments.forEach(comment => commentsById[comment.id] = comment);
        allComments.forEach(comment => {
            if (comment.parentID !== 0 && commentsById[comment.parentID]) {
                // Ensure replies array exists
                if (!commentsById[comment.parentID].replies) {
                    commentsById[comment.parentID].replies = [];
                }
                commentsById[comment.parentID].replies.push(comment);
            }
        });

        // Populate the main comboComments object with top-level comments
        allComments.forEach(comment => {
            if (comment.parentID === 0) {
                if (!comboComments[comment.comboKey]) {
                    comboComments[comment.comboKey] = [];
                }
                comboComments[comment.comboKey].push(comment);
            }
        });
        console.log("Read user comments from table.");
        return true;
    }

    function readLoyalistDataTable() {
        const tbl = getEl('loyalistDataTable');
         if (!tbl) return false;
        const tbody = tbl.querySelector('tbody');
        if (!tbody) return false;

        loyalists = {}; // Reset
        tbody.querySelectorAll('tr').forEach(r => {
            const c = r.querySelectorAll('td');
            // ReferralCode, LoyalistName, City, Combo, Supporters, Donation, Img1, Img2
            if (c.length >= 8) {
                const code = c[0]?.textContent.trim().toUpperCase() ?? '';
                const loyName = c[1]?.textContent.trim() ?? 'Anonymous';
                const city = c[2]?.textContent.trim() ?? 'Unknown';
                const combo = c[3]?.textContent.trim() ?? '';
                const supporters = parseInt(c[4]?.textContent.trim() || '0');
                const donation = parseFloat(c[5]?.textContent.trim() || '0'); // Keep as number
                const img1 = c[6]?.textContent.trim() ?? '';
                const img2 = c[7]?.textContent.trim() ?? '';
                if (code && combo) { // Require code and combo
                    loyalists[code] = {
                        loyalistName: loyName, city: city, combo: combo,
                        supporters: supporters, donation: donation,
                        comboImg1: img1 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A',
                        comboImg2: img2 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A'
                    };
                }
            }
        });
        console.log("Read loyalists from table:", Object.keys(loyalists).length);
        return true;
    }

    // --- UI Rendering Functions ---

    /** Populates the candidate list (President or VP) */
    function populateCandidateList(listElement, candidatesArray, isPresidentList) {
        if (!listElement) return;
        listElement.innerHTML = ''; // Clear existing list

        candidatesArray.forEach(candidateName => {
            const li = document.createElement('li');
            li.className = 'candidate-item';
            li.dataset.candidateName = candidateName;
            li.setAttribute('role', 'button');
            li.setAttribute('tabindex', '0'); // Make focusable

            // Image
            const img = document.createElement('img');
            img.className = 'candidate-photo';
            img.src = candidateImages[candidateName] || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
            img.alt = `Photo of ${candidateName}`;
            img.onerror = () => imageError(img); // Fallback for broken images

            // Name
            const nameDiv = document.createElement('div');
            nameDiv.className = 'candidate-name';
            nameDiv.textContent = candidateName;

            // Details (Age, Zone)
            const details = candidateDetails[candidateName] || { age: '?', zone: '?' };
            const infoDiv = document.createElement('div');
            infoDiv.className = 'candidate-details';
            infoDiv.textContent = `${details.age} - ${details.zone}`;

            // Like Container
            const likeDiv = document.createElement('div');
            likeDiv.className = 'like-container';

            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.innerHTML = '♥'; // Heart icon
            likeBtn.setAttribute('aria-label', `Like ${candidateName}`);
            likeBtn.setAttribute('data-tip', t('likeButtonTip')); // Tooltip

            const likeCountSpan = document.createElement('span');
            likeCountSpan.className = 'like-count';
            likeCountSpan.textContent = formatNumber(candidateLikes[candidateName] || 0);

            // Like button click listener
            likeBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering candidate selection
                if (likeBtn.disabled) return;

                const currentLikes = candidateLikes[candidateName] || 0;
                candidateLikes[candidateName] = currentLikes + 1; // Optimistic UI update
                updateCandidateLikesUI(candidateName); // Update display
                showHeartBlast(event); // Show animation
                likeBtn.disabled = true; // Prevent multi-clicks

                console.log(`Liking ${candidateName}... (Sending message to page)`);
                // Send message to parent Wix page
                window.parent.postMessage({
                    type: 'recordLike',
                    payload: { candidateName: candidateName }
                }, '*'); // Use specific origin in production

                // Re-enable button after a short delay
                setTimeout(() => { likeBtn.disabled = false; }, 1500);
            });

            likeDiv.appendChild(likeBtn);
            likeDiv.appendChild(likeCountSpan);

            // Candidate selection click listener
            const handleSelection = () => {
                 // Remove pop animation from others in the same list
                listElement.querySelectorAll('.candidate-item.pop-animation').forEach(item => item.classList.remove('pop-animation'));
                li.classList.add('pop-animation'); // Add pop animation class
                setTimeout(() => li.classList.remove('pop-animation'), 300); // Remove after animation

                if (isPresidentList) {
                    if (selectedPresident !== candidateName) {
                        selectedPresident = candidateName;
                        highlightSelected(presidentListEl, candidateName);
                        showWikiLightbox(candidateName); // Show info
                    }
                } else {
                    if (selectedVP !== candidateName) {
                        selectedVP = candidateName;
                        highlightSelected(vicePresidentListEl, candidateName);
                        showWikiLightbox(candidateName); // Show info
                    }
                }
                updateProgress(); // Update vote button state
            };

            li.addEventListener('click', handleSelection);
            li.addEventListener('keydown', (e) => { // Accessibility for keyboard
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelection();
                }
            });


            li.appendChild(img);
            li.appendChild(nameDiv);
            li.appendChild(infoDiv);
            li.appendChild(likeDiv);
            listElement.appendChild(li);
        });
    }

    /** Adds/removes 'selected' class to highlight the chosen candidate */
    function highlightSelected(listElement, selectedName) {
        if (!listElement) return;
        listElement.querySelectorAll('.candidate-item').forEach(item => {
            if (item.dataset.candidateName === selectedName) {
                item.classList.add('selected');
                item.setAttribute('aria-pressed', 'true');
            } else {
                item.classList.remove('selected');
                 item.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /** Updates the like count display for a specific candidate */
    function updateCandidateLikesUI(candidateName) {
        const currentLikes = candidateLikes[candidateName] || 0;
        const formattedLikes = formatNumber(currentLikes);
        // Update in both president and VP lists if candidate exists in both
        document.querySelectorAll(`.candidate-item[data-candidate-name="${candidateName}"] .like-count`)
            .forEach(span => {
                span.textContent = formattedLikes;
            });
        // Also update combo grid if needed (might require re-rendering grid)
        renderComboGrid(); // Re-render grid to update counts there too
    }

    /** Renders the bar chart using vote data */
    function renderChart() {
        if (!chartBarsEl) return;
        chartBarsEl.innerHTML = ''; // Clear previous bars

        const sortedVotes = Object.entries(votesData).sort(([, a], [, b]) => b - a);

        if (sortedVotes.length === 0) {
            chartBarsEl.textContent = t('noVotesChart');
            return;
        }

        const maxVotes = sortedVotes[0][1]; // Votes of the top combo

        sortedVotes.forEach(([combo, count]) => {
            const row = document.createElement('div');
            row.className = 'chart-bar';

            const labelDiv = document.createElement('div');
            labelDiv.className = 'bar-label';
            labelDiv.textContent = combo;
            labelDiv.title = `${combo} (${formatNumber(count)} votes)`; // Tooltip for full text

            const countSpan = document.createElement('span');
            countSpan.className = 'bar-count-label'; // Renamed class
            countSpan.textContent = ` (${formatNumber(count)})`;
            labelDiv.appendChild(countSpan);

            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            const barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            // Calculate percentage relative to the top combo
            const percentage = (maxVotes > 0) ? (count / maxVotes) * 100 : 0;
            barFill.style.width = `${percentage.toFixed(1)}%`;
            barFill.setAttribute('aria-valuenow', count); // Accessibility
            barFill.setAttribute('aria-valuemin', '0');
            barFill.setAttribute('aria-valuemax', maxVotes);


            barContainer.appendChild(barFill);
            row.appendChild(labelDiv);
            row.appendChild(barContainer);
            chartBarsEl.appendChild(row);
        });
    }

    /** Renders the grid of voted combinations */
    function renderComboGrid() {
        if (!comboGridEl) return;
        comboGridEl.innerHTML = ''; // Clear previous grid

        const sortedVotes = Object.entries(votesData).sort(([, a], [, b]) => b - a);

        if (sortedVotes.length === 0) {
            comboGridEl.textContent = t('noCombosGrid');
            return;
        }

        sortedVotes.forEach(([combo, count]) => {
            const card = document.createElement('div');
            card.className = 'combo-card';
            card.dataset.comboKey = combo;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0'); // Make focusable

            // Share Button
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '🔗'; // Link icon
            shareBtn.setAttribute('aria-label', `Share ${combo}`);
            shareBtn.setAttribute('data-tip', t('shareButtonTip'));

            shareBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Don't trigger card click
                const shareText = `Check out the ${combo} combo in the 2027 Nigeria Election Poll! Vote here: ${window.location.href}`;
                if (navigator.share) {
                    navigator.share({ title: 'Nigeria Election Poll Combo', text: shareText })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing:', error));
                } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(shareText)
                        .then(() => alert(t('shareSuccessClipboard', { combo: combo }))) // Assuming you add this key
                        .catch(err => alert(t('errorClipboardCopy')));
                }
            });

            // Candidate Images
            const topDiv = document.createElement('div');
            topDiv.className = 'combo-top';
            const [presName, vpName] = combo.split(" & ");

            const imgPres = document.createElement('img');
            imgPres.className = 'combo-img';
            imgPres.src = candidateImages[presName] || 'https://placehold.co/55x55/cccccc/ffffff?text=P';
            imgPres.alt = `${presName}`;
            imgPres.onerror = () => imageError(imgPres);

            const imgVP = document.createElement('img');
            imgVP.className = 'combo-img';
            imgVP.src = candidateImages[vpName] || 'https://placehold.co/55x55/cccccc/ffffff?text=V';
            imgVP.alt = `${vpName}`;
            imgVP.onerror = () => imageError(imgVP);

            topDiv.appendChild(imgPres);
            topDiv.appendChild(imgVP);

            // Combo Title
            const titleDiv = document.createElement('div');
            titleDiv.className = 'combo-title';
            titleDiv.textContent = combo;

            // Stats (Votes, Comments)
            const statsDiv = document.createElement('div');
            statsDiv.className = 'combo-stats';

            const voteSpan = document.createElement('span');
            voteSpan.className = 'vote-heart';
            voteSpan.innerHTML = `♥ ${formatNumber(count)}`; // Heart icon + count

            // Calculate total comments (including replies)
            const commentsArray = comboComments[combo] || [];
            let totalComments = 0;
            function countCommentsRecursive(comments) {
                comments.forEach(comment => {
                    totalComments++;
                    if (comment.replies && comment.replies.length > 0) {
                        countCommentsRecursive(comment.replies);
                    }
                });
            }
            countCommentsRecursive(commentsArray);

            const commentSpan = document.createElement('span');
            commentSpan.className = 'comment-icon';
            commentSpan.innerHTML = `💬 ${formatNumber(totalComments)}`; // Chat icon + count

            statsDiv.appendChild(voteSpan);
            statsDiv.appendChild(commentSpan);

            card.appendChild(shareBtn);
            card.appendChild(topDiv);
            card.appendChild(titleDiv);
            card.appendChild(statsDiv);

            // Click listener to open comments
            const openCommentsHandler = () => openComboComments(combo);
            card.addEventListener('click', openCommentsHandler);
             card.addEventListener('keydown', (e) => { // Accessibility
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCommentsHandler();
                }
            });

            comboGridEl.appendChild(card);
        });
    }

    /** Renders the list of top influencers grouped by combo */
    function renderComboLoyalists() {
        if (!loyalistCombosEl) return;
        loyalistCombosEl.innerHTML = ''; // Clear previous list

        // 1. Group loyalists by the combo they support
        const comboMap = {};
        Object.entries(loyalists).forEach(([refCode, loyData]) => {
            const comboName = loyData.combo;
            if (!comboName) return; // Skip if combo is missing
            if (!comboMap[comboName]) {
                comboMap[comboName] = []; // Initialize array for this combo
            }
            comboMap[comboName].push({
                code: refCode,
                name: loyData.loyalistName || "Anonymous",
                city: loyData.city || "Unknown",
                supporters: loyData.supporters || 0,
                comboImg1: loyData.comboImg1 || 'https://placehold.co/50x50/cccccc/ffffff?text=P',
                comboImg2: loyData.comboImg2 || 'https://placehold.co/50x50/cccccc/ffffff?text=V'
            });
        });

        const medalIcons = ["🥇", "🥈", "🥉"]; // Medals for top 3
        let foundAny = false;

        // 2. Render each combo that has loyalists
        Object.keys(comboMap).forEach((comboName) => {
            const arr = comboMap[comboName];
            if (!arr || arr.length === 0) return; // Skip if no loyalists for this combo
            foundAny = true;

            // Sort loyalists by supporter count (descending)
            arr.sort((a, b) => b.supporters - a.supporters);

            // Use the first loyalist's record for combo images (assuming they are consistent)
            const { comboImg1, comboImg2 } = arr[0];

            // Create wrapper for this combo block
            const comboWrapper = document.createElement('div');
            comboWrapper.className = 'loyalist-combo-wrap';

            // Combo Title
            const comboTitle = document.createElement('h4');
            comboTitle.className = 'loyalist-combo-title';
            comboTitle.textContent = comboName;
            comboWrapper.appendChild(comboTitle);

            // Flex container for images and influencer list
            const flexContainer = document.createElement('div');
            flexContainer.className = 'loyalist-flex';

            // Left Column: Images
            const imagesCol = document.createElement('div');
            imagesCol.className = 'loyalist-images-col';
            const img1 = document.createElement('img');
            img1.className = 'loyalist-square-img';
            img1.src = comboImg1;
            img1.alt = `Candidate 1 for ${comboName}`;
            img1.onerror = () => imageError(img1);
            const img2 = document.createElement('img');
            img2.className = 'loyalist-square-img';
            img2.src = comboImg2;
            img2.alt = `Candidate 2 for ${comboName}`;
            img2.onerror = () => imageError(img2);
            imagesCol.appendChild(img1);
            imagesCol.appendChild(img2);

            // Right Column: Influencer Rows
            const influencersCol = document.createElement('div');
            influencersCol.className = 'loyalist-influencers-col';
            arr.forEach((loy, index) => {
                const icon = medalIcons[index] || '⭐'; // Medal or star
                const row = document.createElement('div');
                row.className = 'loyalist-row';

                // Build the text description
                const textLine = document.createElement('div');
                textLine.className = 'loyalist-info';
                // Using innerHTML for easier formatting with bold/em tags
                textLine.innerHTML = `
                    <span class="loyalist-medal" aria-hidden="true">${icon}</span>
                    <strong>${loy.name}</strong> from ${loy.city}
                    influenced <em>${loy.supporters.toLocaleString()}</em> supporters
                    for this combo.
                `;
                row.appendChild(textLine);
                influencersCol.appendChild(row);
            });

            // Assemble the flex container
            flexContainer.appendChild(imagesCol);
            flexContainer.appendChild(influencersCol);
            comboWrapper.appendChild(flexContainer); // Add flex container to wrapper
            loyalistCombosEl.appendChild(comboWrapper); // Add wrapper to main container
        });

        // Show placeholder if no loyalist data exists at all
        if (!foundAny) {
            loyalistCombosEl.textContent = t('noLoyalists');
        }
    }

    /** Opens the comments section for a specific combo */
    function openComboComments(comboKey) {
        if (!comboCommentSection || !comboCommentTitle) return;
        currentCombo = comboKey; // Set the currently viewed combo

        comboCommentTitle.textContent = `${t('commentsTitle')}: ${comboKey}`; // Update title
        renderComboComments(); // Render comments for this combo

        comboCommentSection.classList.add('active'); // Show and fade in section (CSS handles animation)
        // Scroll into view smoothly after it's visible
        setTimeout(() => {
            comboCommentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50); // Small delay helps ensure smooth scroll
    }

    /** Renders the comments and replies for the currentCombo */
    function renderComboComments() {
        if (!comboCommentListEl || !currentCombo) return;
        comboCommentListEl.innerHTML = ''; // Clear previous comments

        const commentsForCombo = comboComments[currentCombo] || [];

        if (commentsForCombo.length === 0) {
            comboCommentListEl.textContent = t('noComments');
            return;
        }

        // Render only top-level comments; createCommentElement handles replies recursively
        commentsForCombo.forEach(comment => {
            if (!comment.parentID || comment.parentID === 0) {
                comboCommentListEl.appendChild(createCommentElement(comment));
            }
        });
    }

    /** Recursively creates HTML elements for comments and their replies */
    function createCommentElement(commentData) {
        const wrap = document.createElement('div');
        wrap.className = 'combo-comment-item';
        wrap.dataset.commentId = commentData.id; // Store comment ID

        // Author
        const authorDiv = document.createElement('div');
        authorDiv.className = 'comment-author';
        authorDiv.textContent = commentData.name || "Anonymous";

        // Text
        const textDiv = document.createElement('div');
        textDiv.className = 'comment-text';
        textDiv.textContent = commentData.text || "(No comment)";

        // Reply Action
        const actionsDiv = document.createElement('button'); // Use button for accessibility
        actionsDiv.className = 'comment-actions';
        actionsDiv.textContent = t('replyButton'); // Translate
        actionsDiv.setAttribute('aria-expanded', 'false'); // Initial state

        // Reply Form (initially hidden)
        const replyFormDiv = document.createElement('div');
        replyFormDiv.className = 'reply-form';
        // replyFormDiv.style.display = 'none'; // CSS handles initial display:none

        const replyNameInput = document.createElement('input');
        replyNameInput.className = 'reply-input';
        replyNameInput.type = 'text';
        replyNameInput.placeholder = t('labelCommentName'); // Translate placeholder
        replyNameInput.setAttribute('aria-label', 'Your Name for Reply');

        const replyTextInput = document.createElement('textarea');
        replyTextInput.className = 'reply-textarea';
        replyTextInput.rows = 2;
        replyTextInput.placeholder = t('labelCommentText'); // Translate placeholder
        replyTextInput.setAttribute('aria-label', 'Your Reply Text');


        const replyBtn = document.createElement('button');
        replyBtn.className = 'reply-btn';
        replyBtn.innerHTML = `<span class="btn-text">${t('replyButton')}</span><span class="button-loader"></span>`; // Include loader span

        // Toggle reply form visibility
        actionsDiv.addEventListener('click', () => {
            const isVisible = replyFormDiv.style.display === 'flex';
            replyFormDiv.style.display = isVisible ? 'none' : 'flex';
            actionsDiv.setAttribute('aria-expanded', !isVisible);
            if (!isVisible) {
                replyNameInput.focus(); // Focus name field when opening
            }
        });

        // Reply button click listener
        replyBtn.addEventListener('click', () => {
            const replyName = replyNameInput.value.trim();
            const replyText = replyTextInput.value.trim();
            if (!replyName || !replyText) {
                alert(t('errorReplyFields'));
                return;
            }

            setButtonLoading(replyBtn, true); // Show loading spinner

            const replyPayload = {
                parentID: commentData.id, // ID of the comment being replied to
                name: replyName,
                text: replyText,
                comboKey: commentData.comboKey // Associate with the correct combo
            };

            console.log("Sending reply message to parent page:", replyPayload);
            // Send message to parent Wix page
            window.parent.postMessage({
                type: 'addComment',
                payload: replyPayload
            }, '*'); // Use specific origin in production

            // Optimistic UI Update: Add reply locally (will be replaced by Wix data later if IDs differ)
            const tempReplyData = {
                ...replyPayload,
                id: `temp-${Date.now()}-${Math.random()}`, // Temporary unique ID
                replies: []
            };
            if (!commentData.replies) commentData.replies = [];
            commentData.replies.push(tempReplyData);

            // Clear form, hide it, and re-render comments
            replyNameInput.value = '';
            replyTextInput.value = '';
            replyFormDiv.style.display = 'none';
            actionsDiv.setAttribute('aria-expanded', 'false');
            renderComboComments(); // Update the comment list display
            renderComboGrid(); // Update comment count on combo card

            // Reset button after a delay
            setTimeout(() => {
                setButtonLoading(replyBtn, false);
            }, 1500);
        });

        replyFormDiv.appendChild(replyNameInput);
        replyFormDiv.appendChild(replyTextInput);
        replyFormDiv.appendChild(replyBtn);

        wrap.appendChild(authorDiv);
        wrap.appendChild(textDiv);
        wrap.appendChild(actionsDiv);
        wrap.appendChild(replyFormDiv); // Add hidden reply form

        // Recursively render replies
        if (commentData.replies && commentData.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.className = 'comment-replies';
            commentData.replies.forEach(reply => {
                repliesContainer.appendChild(createCommentElement(reply)); // Recursive call
            });
            wrap.appendChild(repliesContainer);
        }

        return wrap;
    }

    // --- amCharts Initialization and Rendering ---

    /** Initializes the amCharts Map */
    function initMap() {
        if (!nigeriaMapEl) {
             console.warn("Map container element not found.");
             return;
        }
        // Dispose previous chart instance if it exists
        if (mapChart) {
            mapChart.dispose();
            mapChart = null;
            polygonSeries = null;
        }

        am5.ready(() => {
            try {
                let root = am5.Root.new(nigeriaMapEl); // Use the container ID
                root.setThemes([am5themes_Animated.new(root)]);

                mapChart = root.container.children.push(
                    am5map.MapChart.new(root, {
                        panX: "rotateX", panY: "none", // Allow rotation, disable vertical pan
                        wheelX: "zoom", wheelY: "none", // Zoom on horizontal scroll
                        projection: am5map.geoMercator(), // Map projection
                        maxZoomLevel: 4, minZoomLevel: 0.8 // Zoom limits
                    })
                );

                // Create polygon series for Nigeria states
                polygonSeries = mapChart.series.push(
                    am5map.MapPolygonSeries.new(root, {
                        geoJSON: am5geodata_nigeriaLow, // GeoJSON data for Nigeria
                        valueField: "value", // Field in data for heatmapping
                        calculateAggregates: true // Useful for heat rules
                    })
                );

                // Configure polygon appearance and interactions
                polygonSeries.mapPolygons.template.setAll({
                    tooltipHTML: `<div style="min-width:150px; font-family: 'Montserrat', sans-serif;">{tooltipHTML}</div>`, // Custom HTML tooltip
                    interactive: true, // Enable hover/click
                    fill: am5.color(0xcccccc), // Default fill color
                    templateField: "polygonSettings" // Allow per-polygon settings
                });

                // Hover state
                polygonSeries.mapPolygons.template.states.create("hover", {
                    fill: am5.color(0xffa500) // Orange fill on hover
                });

                 // Heat rule (optional, colors states based on value)
                // polygonSeries.set("heatRules", [{
                //     target: polygonSeries.mapPolygons.template,
                //     min: am5.color(0xccffcc), // Light green for low values
                //     max: am5.color(0x006400), // Dark green for high values
                //     dataField: "value",
                //     key: "fill",
                //     logarithmic: true // Use logarithmic scale for better distribution
                // }]);

                // Add zoom control
                mapChart.set("zoomControl", am5map.ZoomControl.new(root, {}));

                renderMap(); // Initial render with available data

            } catch (e) {
                console.error("Error initializing amCharts map:", e);
                if(nigeriaMapEl) nigeriaMapEl.textContent = t('errorMapLoad');
            }
        });
    }

    /** Processes state data to find the top combo for each state */
    function computeStateTopCombos() {
        let stateResults = {};
        if (!Array.isArray(mapStatesData) || mapStatesData.length === 0) {
            return stateResults; // Return empty if no data
        }

        // --- IMPORTANT: Map CMS field keys to readable combo names ---
        // This mapping is CRUCIAL and depends ENTIRELY on how the fields
        // are named in your Wix CMS collection (mapStatesData).
        // Add ALL possible field keys from your CMS here.
        const keyToComboNameMap = {
            "bolaTinubuKashimShettima": "Bola Tinubu & Kashim Shettima", // Example key
            "atikuAbubakarNyesomWike": "Atiku Abubakar & Nyesom Wike", // Example key
            "peterObiYemiOsinbajo": "Peter Obi & Yemi Osinbajo", // Example key
            // Add ALL other combo field keys from your CMS collection below
            // "cmsFieldKey1": "Readable Combo Name 1",
            // "cmsFieldKey2": "Readable Combo Name 2",
            // ...etc
        };
        // --- End of Mapping ---

        const unmappedKeys = new Set(); // Track keys not found in map

        mapStatesData.forEach(stateItem => {
            if (!stateItem || !stateItem.state || stateItem.state.toUpperCase() === "TOTAL") {
                return; // Skip invalid items or total rows
            }
            const stateName = stateItem.state;
            let topComboName = null;
            let maxVotes = -1;

            // Iterate through properties of the state item
            for (const key in stateItem) {
                // Check if the key represents a combo vote count
                if (key !== 'state' && key !== 'zone' && !key.startsWith('_') && typeof stateItem[key] === 'number') {
                    const currentVotes = stateItem[key];
                    if (currentVotes > maxVotes) {
                        const standardizedComboName = keyToComboNameMap[key]; // Look up readable name
                        if (standardizedComboName) {
                            maxVotes = currentVotes;
                            topComboName = standardizedComboName;
                        } else if (!unmappedKeys.has(key)) {
                            // Warn only once per unmapped key
                            console.warn(`Map Data Warning: No combo name mapping found for CMS key: '${key}' in state '${stateName}'. Add this key to keyToComboNameMap.`);
                            unmappedKeys.add(key);
                        }
                    }
                }
            }
            // Store the result for the state
            stateResults[stateName] = (topComboName !== null)
                ? { combo: topComboName, count: maxVotes }
                : { combo: "N/A", count: 0 };
        });
        return stateResults;
    }


    /** Updates the amCharts map display with processed state data */
    function renderMap() {
        if (!polygonSeries || !mapChart) {
            // console.log("renderMap: Map or series not ready yet.");
            return;
        }

        // Mapping from State Name to GeoJSON ID (from am5geodata_nigeriaLow.js)
        const stateIdMap = {
            "Abia": "NG-AB", "Adamawa": "NG-AD", "Akwa Ibom": "NG-AK", "Anambra": "NG-AN",
            "Bauchi": "NG-BA", "Bayelsa": "NG-BY", "Benue": "NG-BE", "Borno": "NG-BO",
            "Cross River": "NG-CR", "Delta": "NG-DE", "Ebonyi": "NG-EB", "Edo": "NG-ED",
            "Ekiti": "NG-EK", "Enugu": "NG-EN", "FCT Abuja": "NG-FC", "Gombe": "NG-GO",
            "Imo": "NG-IM", "Jigawa": "NG-JI", "Kaduna": "NG-KD", "Kano": "NG-KN",
            "Katsina": "NG-KT", "Kebbi": "NG-KE", "Kogi": "NG-KO", "Kwara": "NG-KW",
            "Lagos": "NG-LA", "Nasarawa": "NG-NA", "Niger": "NG-NI", "Ogun": "NG-OG",
            "Ondo": "NG-ON", "Osun": "NG-OS", "Oyo": "NG-OY", "Plateau": "NG-PL",
            "Rivers": "NG-RI", "Sokoto": "NG-SO", "Taraba": "NG-TA", "Yobe": "NG-YO",
            "Zamfara": "NG-ZA"
        };

        let topCombosByState = computeStateTopCombos(); // Process the raw data
        let mapDataForSeries = [];

        // Prepare data in the format amCharts expects
        Object.entries(stateIdMap).forEach(([stateName, geoId]) => {
            let comboInfo = topCombosByState[stateName];
            let tooltipContent = `<strong>${stateName}</strong><br>${t('mapNoData')}`;
            let voteCount = 0; // Used for potential heat map

            if (comboInfo && comboInfo.combo && comboInfo.combo !== "N/A" && comboInfo.count >= 0) {
                voteCount = comboInfo.count;
                // Extract candidate names for images (optional)
                const [presName = '', vpName = ''] = comboInfo.combo.split(" & ");
                const imgPresSrc = candidateImages[presName] || 'https://placehold.co/35x35/cccccc/ffffff?text=P';
                const imgVPSrc = candidateImages[vpName] || 'https://placehold.co/35x35/cccccc/ffffff?text=V';

                tooltipContent = `
                    <div style="text-align: center; padding: 5px;">
                        <strong>${stateName}</strong><hr style="margin: 3px 0;">
                        Top Combo:<br><strong>${comboInfo.combo}</strong><br>
                        Votes: ${formatNumber(voteCount)}
                        <div style="margin-top: 5px; display: flex; justify-content: center; gap: 5px;">
                           <img src="${imgPresSrc}" alt="${presName}" style="width:30px; height:30px; border-radius:50%; border: 1px solid #aaa;">
                           <img src="${imgVPSrc}" alt="${vpName}" style="width:30px; height:30px; border-radius:50%; border: 1px solid #aaa;">
                        </div>
                    </div>`;
            }

            mapDataForSeries.push({
                id: geoId,          // GeoJSON ID for the state
                name: stateName,    // State name
                value: voteCount,   // Vote count (for heat map or just display)
                tooltipHTML: tooltipContent // HTML content for the tooltip
            });
        });

        // Set the prepared data to the polygon series
        polygonSeries.data.setAll(mapDataForSeries);
        // console.log("Map data updated.");
    }


    /** Renders the amCharts Pie Chart for overall popularity */
    function renderPieChart() {
        if (!popularityPieEl) {
            console.warn("Pie chart container element not found.");
            return;
        }

        // Dispose previous chart instance
        if (pieRoot) {
            pieRoot.dispose();
            pieRoot = null;
            currentPieChart = null;
        }

        // Prepare data: { combo: "Name", votes: count }
        const chartData = Object.entries(votesData)
            .map(([combo, votes]) => ({ combo, votes }))
            .filter(item => item.votes > 0); // Only include combos with votes

        if (chartData.length === 0) {
            popularityPieEl.innerHTML = `<p style="text-align: center; padding: 2rem;">${t('noPieData')}</p>`;
            return;
        } else {
             popularityPieEl.innerHTML = ""; // Clear placeholder
        }

        // Sort data for better legend/slice order (optional)
        chartData.sort((a, b) => b.votes - a.votes);

        am5.ready(() => {
            try {
                pieRoot = am5.Root.new(popularityPieEl); // Use container ID
                pieRoot.setThemes([am5themes_Animated.new(pieRoot)]);

                // Create container for chart and legend
                 let container = pieRoot.container.children.push(am5.Container.new(pieRoot, {
                    width: am5.percent(100), height: am5.percent(100), layout: pieRoot.verticalLayout
                 }));


                // Create Pie Chart instance
                currentPieChart = container.children.push( // Assign to currentPieChart
                    am5percent.PieChart.new(pieRoot, {
                        layout: pieRoot.verticalLayout, // Stack chart & legend vertically
                        innerRadius: am5.percent(40) // Make it a donut chart (optional)
                    })
                );

                // Create Pie Series
                let series = currentPieChart.series.push(
                    am5percent.PieSeries.new(pieRoot, {
                        valueField: "votes",
                        categoryField: "combo",
                        alignLabels: true,
                        radius: am5.percent(90) // Adjust outer radius
                    })
                );

                // Set data to the series
                series.data.setAll(chartData);

                // Configure slice labels (optional, can be cluttered)
                series.labels.template.setAll({
                    radius: 10, // Position labels slightly outside
                    text: "{category}: {valuePercentTotal.formatNumber('0.0')}%",
                    fontSize: "0.8em",
                    fill: am5.color(0x333333),
                    oversizedBehavior: "truncate", // Truncate long labels
                    maxWidth: 110,
                    populateText: true // Enable text population
                });
                // Hide labels for small slices
                 series.labels.template.adapters.add("hidden", function(hidden, target) {
                     return target.dataItem.get("valuePercentTotal") < 3; // Hide if less than 3%
                 });

                // Configure tick lines for labels (optional)
                 series.ticks.template.setAll({
                     strokeOpacity: 0.4,
                     stroke: am5.color(0x666666),
                     location: 0.5, // Center tick on label
                     length: 10, // Tick length
                     // visible: true // Already default
                 });
                 // Hide ticks for small slices if labels are hidden
                 series.ticks.template.adapters.add("hidden", function(hidden, target) {
                     return target.dataItem.get("valuePercentTotal") < 3;
                 });


                // Configure slice appearance and tooltips
                series.slices.template.setAll({
                    tooltipText: "{category}: {value} votes ({valuePercentTotal.formatNumber('0.0')}%)",
                    stroke: am5.color(0xffffff), // White border between slices
                    strokeWidth: 1,
                    interactive: true // Enable hover/click
                });
                // Hover effect for slices
                series.slices.template.states.create("hover", { scale: 1.03 });

                // Add Legend
                 let legend = container.children.push(am5.Legend.new(pieRoot, {
                     centerX: am5.percent(50), x: am5.percent(50), // Center legend
                     marginTop: 15, marginBottom: 15,
                     layout: pieRoot.horizontalLayout, // Horizontal layout
                     width: am5.percent(95), // Limit width
                     wrap: true // Allow legend items to wrap
                 }));

                 legend.labels.template.setAll({
                     fontSize: "0.85em", fontWeight: "500", fill: am5.color(0x333333)
                 });
                 legend.itemContainers.template.setAll({ paddingTop: 4, paddingBottom: 4 }); // Spacing

                legend.data.setAll(series.dataItems); // Link legend to series data

                // Animate series appearance
                series.appear(1000, 100);

            } catch (e) {
                console.error("Error rendering amCharts pie chart:", e);
                 if(popularityPieEl) popularityPieEl.textContent = t('errorPieLoad');
            }
        });
    }


    // --- Event Listeners Setup ---

    function setupEventListeners() {
        // Language Picker
        if (langPicker) {
            langPicker.addEventListener('change', (e) => {
                currentLang = e.target.value;
                updateUITranslations(); // Update all text
                startCountdown(); // Restart countdown to update label
                // Potentially re-render charts if they have translatable text
                renderMap();
                renderPieChart();
            });
        }

        // Mobile Menu
        if (mobileMenuBtn && mobileNavPanel) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileNavPanel.classList.add('active');
                 mobileNavPanel.setAttribute('aria-hidden', 'false');
                 mobileMenuBtn.setAttribute('aria-expanded', 'true');
            });
        }
        if (mobileNavCloseBtn && mobileNavPanel) {
            mobileNavCloseBtn.addEventListener('click', () => {
                mobileNavPanel.classList.remove('active');
                 mobileNavPanel.setAttribute('aria-hidden', 'true');
                 mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        }
        // Close mobile nav when a link is clicked
        mobileNavPanel?.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavPanel.classList.remove('active');
                 mobileNavPanel.setAttribute('aria-hidden', 'true');
                 mobileMenuBtn.setAttribute('aria-expanded', 'false');
                // Smooth scroll handled by CSS `scroll-behavior: smooth`
            });
        });

        // Candidate Selection (delegated listeners added in populateCandidateList)

        // Input Validation & Progress Update
        [voterNameEl, voterPhoneEl, voterStateEl, voterCityEl, voterGenderEl, voterAgeEl].forEach(el => {
            el?.addEventListener('input', updateProgress);
            el?.addEventListener('change', updateProgress); // For select elements
        });
        // Specific validation for phone and age
        voterPhoneEl?.addEventListener('input', () => {
            voterPhoneEl.value = voterPhoneEl.value.replace(/\D/g, '').slice(0, 11); // Allow only digits, max 11
        });
         voterAgeEl?.addEventListener('input', () => {
             voterAgeEl.value = voterAgeEl.value.replace(/\D/g, ''); // Allow only digits
         });


        // Vote Button
        if (voteBtn) {
            voteBtn.addEventListener('click', handleVoteSubmission);
        }

        // Comment Post Button
        if (comboCommentPostBtn) {
            comboCommentPostBtn.addEventListener('click', handlePostComment);
        }

        // Contact Us Lightbox Trigger
        if (contactUsBtn && lightboxOverlay) {
            contactUsBtn.addEventListener('click', () => {
                lightboxOverlay.style.display = 'flex';
                lightboxOverlay.setAttribute('aria-hidden', 'false');
                contactFullNameEl?.focus(); // Focus first field
            });
        }
        // Contact Us Lightbox Close
        if (lightboxClose && lightboxOverlay) {
            lightboxClose.addEventListener('click', () => {
                lightboxOverlay.style.display = 'none';
                lightboxOverlay.setAttribute('aria-hidden', 'true');
            });
        }
        // Contact Us Overlay Click Close
        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', (e) => {
                if (e.target === lightboxOverlay) {
                    lightboxOverlay.style.display = 'none';
                    lightboxOverlay.setAttribute('aria-hidden', 'true');
                }
            });
        }
        // Contact Us Form Submission
        if (lightboxForm) {
            lightboxForm.addEventListener('submit', handleContactFormSubmit);
        }


        // Referral Request Lightbox Trigger
        if (getReferralCodeBtn && referralLightbox) {
            getReferralCodeBtn.addEventListener('click', () => {
                referralLightbox.style.display = 'flex';
                referralLightbox.setAttribute('aria-hidden', 'false');
                referralNameEl?.focus(); // Focus first field
            });
        }
        // Referral Lightbox Close
        if (referralLightboxClose && referralLightbox) {
            referralLightboxClose.addEventListener('click', closeReferralLightbox);
        }
        // Referral Overlay Click Close
        if (referralLightbox) {
            referralLightbox.addEventListener('click', (e) => {
                if (e.target === referralLightbox) {
                    closeReferralLightbox();
                }
            });
        }
        // Referral Form Submission
        if (referralRequestForm) {
            referralRequestForm.addEventListener('submit', handleReferralRequestSubmit);
        }

        // Wiki Lightbox Close/Overlay
        if(wikiCloseBtn) wikiCloseBtn.addEventListener('click', closeWikiLightbox);
        if(wikiLightbox) wikiLightbox.addEventListener('click', (e) => {
             if (e.target === wikiLightbox) closeWikiLightbox();
        });

         // Close lightboxes on Escape key
         document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightboxOverlay?.style.display === 'flex') {
                    lightboxOverlay.style.display = 'none';
                    lightboxOverlay.setAttribute('aria-hidden', 'true');
                }
                if (referralLightbox?.style.display === 'flex') {
                    closeReferralLightbox();
                }
                 if (wikiLightbox?.style.display === 'flex') {
                    closeWikiLightbox();
                }
            }
        });
    }

    // --- Action Handlers ---

    /** Handles the vote submission process */
    async function handleVoteSubmission() {
        // 1. Validations
        if (voteBtn.disabled) return;
        if (!selectedPresident || !selectedVP) {
            alert(t('errorSelectCandidates')); return;
        }
        if (selectedPresident === selectedVP) {
            alert(t('errorSameCandidate')); return;
        }
        const name = voterNameEl?.value.trim();
        const phone = voterPhoneEl?.value.trim();
        const state = voterStateEl?.value;
        const city = voterCityEl?.value;
        const gender = voterGenderEl?.value;
        const age = voterAgeEl?.value.trim();
        const ageNum = parseInt(age || '0');

        if (!name || !/^[0]\d{10}$/.test(phone) || !state || !city || !gender || ageNum < 18) {
            alert(t('errorFillFields')); return;
        }

        // 2. Set Loading State
        setButtonLoading(voteBtn, true);
        voteBtn.classList.remove('success'); // Remove success state if reapplied
        if (voteConfirmationDiv) voteConfirmationDiv.style.display = 'none'; // Hide previous confirmation

        // 3. Prepare Vote Data
        const comboKey = `${selectedPresident} & ${selectedVP}`;
        const typedReferral = voterReferralEl?.value.trim().toUpperCase() || null;
        const timestamp = new Date().toISOString(); // Add timestamp

        const votePayload = {
            name: name, phone: phone, state: state, city: city, gender: gender,
            age: ageNum, combo: comboKey, referralCodeUsed: typedReferral,
            timestamp: timestamp // Include timestamp
        };

        // 4. Generate Client-Side Hash (Proof of Submission Concept)
        // Combine relevant data for hashing. Include a timestamp for uniqueness.
        const dataToHash = JSON.stringify({
            combo: comboKey,
            phoneLast4: phone.slice(-4), // Use partial phone for privacy but some uniqueness
            state: state,
            timestamp: timestamp
        });
        const voteHash = await sha256hex(dataToHash);

        // Add hash to payload sent to backend (optional, backend might generate its own)
        votePayload.clientHash = voteHash;

        // 5. Send Vote Data to Wix Parent Page
        console.log("Sending vote message to parent page:", votePayload);
        window.parent.postMessage({
            type: 'recordVote',
            payload: votePayload
        }, '*'); // Use specific origin in production! '*' is insecure.

        // 6. Optimistic UI Update & Confirmation Display
        votesData[comboKey] = (votesData[comboKey] || 0) + 1; // Increment local count
        // Update loyalist count optimistically if referral used
        if (typedReferral && loyalists[typedReferral]) {
            loyalists[typedReferral].supporters = (loyalists[typedReferral].supporters || 0) + 1;
        }

        // Re-render affected UI components
        renderChart();
        renderComboGrid();
        renderComboLoyalists();
        renderPieChart();
        // Optionally update map if map data includes total votes per state that needs updating locally
        // renderMap();

        // Show visual confirmation message with hash
        if (voteConfirmationDiv) {
            const detailsSpan = voteConfirmationDiv.querySelector('.confirmation-details');
            const hashSpan = voteConfirmationDiv.querySelector('.vote-hash-display code'); // Target the code element

            if (detailsSpan) detailsSpan.textContent = t('voteSuccessDetails', { combo: comboKey });
            if (hashSpan) hashSpan.textContent = `${voteHash.substring(0, 16)}...`; // Show partial hash

            voteConfirmationDiv.style.display = 'block'; // Show the message
        }

        // Show checkmark animation on button
        voteBtn.classList.add('success');

        // Clear referral input after successful vote
        if (voterReferralEl) voterReferralEl.value = '';

        // 7. Reset Button State (after a delay)
        setTimeout(() => {
            voteBtn.classList.remove('success'); // Remove checkmark class
            setButtonLoading(voteBtn, false); // Reset loading state (re-enables button)
            updateProgress(); // Recalculate progress (might disable button again)
            if (voteConfirmationDiv) voteConfirmationDiv.style.display = 'none'; // Hide confirmation msg
        }, 4000); // Keep confirmation visible for 4 seconds
    }

    /** Handles posting a new top-level comment */
    function handlePostComment() {
        if (!currentCombo) {
             // Should not happen if button is only visible when a combo is selected
             console.error("Cannot post comment: No combo selected.");
             return;
        }
        const name = comboCommentName?.value.trim();
        const text = comboCommentText?.value.trim();
        if (!name || !text) {
            alert(t('errorCommentFields'));
            return;
        }

        setButtonLoading(comboCommentPostBtn, true); // Show loading

        const commentPayload = {
            parentID: 0, // 0 indicates a top-level comment
            name: name,
            text: text,
            comboKey: currentCombo // Associate with the current combo
        };

        console.log("Sending new comment message to parent page:", commentPayload);
        // Send message to parent Wix page
        window.parent.postMessage({
            type: 'addComment',
            payload: commentPayload
        }, '*'); // Use specific origin in production

        // Optimistic UI Update
        const tempCommentData = {
            ...commentPayload,
            id: `temp-${Date.now()}-${Math.random()}`, // Temporary unique ID
            replies: []
        };
        if (!comboComments[currentCombo]) comboComments[currentCombo] = [];
        comboComments[currentCombo].push(tempCommentData);

        // Clear form and re-render
        if (comboCommentName) comboCommentName.value = '';
        if (comboCommentText) comboCommentText.value = '';
        renderComboComments(); // Update comment list
        renderComboGrid(); // Update comment count on combo card

        // Reset button after delay
        setTimeout(() => {
            setButtonLoading(comboCommentPostBtn, false);
        }, 1500);
    }

    /** Handles the contact form submission */
    function handleContactFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        if (!lightboxForm || !contactFullNameEl || !contactPhoneEl || !contactEmailEl || !lightboxSubmitMsg) return;

        const submitButton = lightboxForm.querySelector('.lightbox-submit-btn');
        const fullName = contactFullNameEl.value.trim();
        const phone = contactPhoneEl.value.trim();
        const email = contactEmailEl.value.trim();
        const message = contactMessageEl?.value.trim(); // Optional message

        // Basic Validation
        if (!fullName || !phone || !email || !/\S+@\S+\.\S+/.test(email)) { // Simple email check
            alert(t('errorContactFields'));
            return;
        }

        setButtonLoading(submitButton, true); // Show loading

        const contactPayload = { fullName, phone, email, message };

        // TODO: Replace simulation with actual postMessage to Wix
        console.log("Simulating contact form submission:", contactPayload);
        // window.parent.postMessage({ type: 'submitContactForm', payload: contactPayload }, '*');

        // Simulate network delay & show success
        setTimeout(() => {
            lightboxSubmitMsg.style.display = 'block'; // Show success message
            lightboxForm.style.display = 'none'; // Hide form

            // Further timeout to close lightbox and reset form
            setTimeout(() => {
                if (lightboxOverlay) lightboxOverlay.style.display = 'none';
                 lightboxOverlay?.setAttribute('aria-hidden', 'true');
                lightboxSubmitMsg.style.display = 'none'; // Hide message
                lightboxForm.style.display = 'flex'; // Show form again
                // Clear fields
                contactFullNameEl.value = '';
                contactPhoneEl.value = '';
                contactEmailEl.value = '';
                if(contactMessageEl) contactMessageEl.value = '';
                setButtonLoading(submitButton, false); // Reset button AFTER form is visible
            }, 2500); // Duration success message is shown
        }, 1000); // Simulated network delay
    }

     /** Closes the referral lightbox and resets its form */
     function closeReferralLightbox() {
        if (!referralLightbox || !referralRequestForm || !referralSubmitMsg) return;
        referralLightbox.style.display = 'none';
        referralLightbox.setAttribute('aria-hidden', 'true');
        // Reset form visibility and clear message
        referralSubmitMsg.style.display = 'none';
        referralRequestForm.style.display = 'flex'; // Show form for next time
        // Optionally clear fields
        // if(referralNameEl) referralNameEl.value = '';
        // if(referralContactEl) referralContactEl.value = '';
        // Ensure button is reset if it was loading
        const submitButton = referralRequestForm.querySelector('.lightbox-submit-btn');
        setButtonLoading(submitButton, false);
    }


    /** Handles the referral code request form submission */
    function handleReferralRequestSubmit(event) {
        event.preventDefault();
         if (!referralRequestForm || !referralNameEl || !referralContactEl || !referralSubmitMsg) return;

        const submitButton = referralRequestForm.querySelector('.lightbox-submit-btn');
        const name = referralNameEl.value.trim();
        const contact = referralContactEl.value.trim();

        if (!name || !contact) {
            alert(t('errorReferralFields'));
            return;
        }

        setButtonLoading(submitButton, true); // Show loading

        const requestPayload = { name, contact };
        console.log("Sending referral request message to parent page:", requestPayload);
        // Send message to parent Wix page
        window.parent.postMessage({
            type: 'requestReferralCode',
            payload: requestPayload
        }, '*'); // Use specific origin in production

        // Show confirmation message in lightbox, hide form
        referralSubmitMsg.style.display = 'block';
        referralRequestForm.style.display = 'none';

        // Button reset is handled by closeReferralLightbox or after a delay if lightbox remains open
         // setTimeout(() => { setButtonLoading(submitButton, false); }, 3000); // Example if lightbox stays open
    }


    // --- Wix Message Listener ---
    window.addEventListener("message", (event) => {
        // IMPORTANT: Add origin check in production for security
        // const allowedOrigin = "https://your-wix-site.com"; // Replace with your site URL
        // if (event.origin !== allowedOrigin) {
        //     console.warn("Message received from unexpected origin:", event.origin);
        //     return;
        // }

        const msg = event.data;

        if (msg && typeof msg === 'object' && msg.type) {
            console.log("Received message from Wix Page:", msg); // Log received message

            switch (msg.type) {
                case "electionData":
                    // Populate application state and UI with data from Wix
                    populateDataFromWix(msg.payload);
                    break;

                case "voteRecorded":
                    // Confirmation that a vote was saved successfully by the backend
                    console.log("Vote recorded confirmation received.", msg.payload);
                    // Optionally display the referral code if provided by backend
                    if (msg.payload?.newReferralCode) {
                        console.log("Received new referral code (for info only):", msg.payload.newReferralCode);
                        // Example: alert(`Vote recorded! Your personal referral code is ${msg.payload.newReferralCode}`);
                    }
                    // UI was already updated optimistically, maybe just log success
                    break;

                case "referralCodeRequested":
                    // Confirmation that the referral request was received by backend
                    console.log("Referral code request confirmation received:", msg.payload);
                    // Confirmation message is already shown in the lightbox form handler
                    // Optionally close the lightbox automatically here if desired
                    // closeReferralLightbox();
                    break;

                case "commentAdded":
                    // Confirmation that a comment/reply was saved, potentially with the final DB ID
                    console.log("Comment added confirmation received:", msg.payload);
                    // Update local temporary comment ID with the real ID from the database
                    if (msg.payload?._id && msg.payload?.comboKey && msg.payload?.tempId) {
                        const combo = msg.payload.comboKey;
                        const realId = msg.payload._id;
                        const tempId = msg.payload.tempId; // Backend should echo back the tempId

                        if (comboComments[combo]) {
                            const findAndUpdate = (comments) => {
                                for (let i = 0; i < comments.length; i++) {
                                    if (comments[i].id === tempId) {
                                        console.log(`Updating temp comment ID ${tempId} to ${realId}`);
                                        comments[i].id = realId; // Update the ID
                                        // Update dataset ID in the DOM if element exists
                                        const commentElement = comboCommentListEl?.querySelector(`.combo-comment-item[data-comment-id="${tempId}"]`);
                                        commentElement?.setAttribute('data-comment-id', realId);
                                        return true; // Found and updated
                                    }
                                    // Recursively search in replies
                                    if (comments[i].replies && findAndUpdate(comments[i].replies)) {
                                        return true;
                                    }
                                }
                                return false; // Not found in this branch
                            };
                            findAndUpdate(comboComments[combo]);
                        }
                    }
                    break;

                case "likeRecorded":
                    // Confirmation that a like was recorded
                    console.log("Like recorded confirmation received:", msg.payload);
                    // UI was already updated optimistically. Maybe refresh counts if backend sends updated total.
                    if (msg.payload?.candidateName && typeof msg.payload?.totalLikes === 'number') {
                        candidateLikes[msg.payload.candidateName] = msg.payload.totalLikes;
                        updateCandidateLikesUI(msg.payload.candidateName);
                    }
                    break;

                case "operationFailed":
                    // Handle errors reported by the Wix backend
                    const errorMessage = msg.payload?.message || t('errorUnknown');
                    console.error("Received 'operationFailed' message from Wix Page:", errorMessage, msg.payload);
                    alert(t('errorOperationFailed', { message: errorMessage }));

                    // Re-enable any relevant buttons stuck in loading state
                    const failedOperation = msg.payload?.operation;
                    if (failedOperation === 'vote' && voteBtn) {
                        setButtonLoading(voteBtn, false);
                        voteBtn.classList.remove('success');
                    } else if (failedOperation === 'addComment') {
                        if(comboCommentPostBtn) setButtonLoading(comboCommentPostBtn, false);
                        // Also reset any potentially loading reply buttons
                         document.querySelectorAll('.reply-btn.loading').forEach(btn => setButtonLoading(btn, false));
                    } else if (failedOperation === 'requestReferralCode') {
                         const btn = referralRequestForm?.querySelector('.lightbox-submit-btn');
                         if(btn) setButtonLoading(btn, false);
                    } else if (failedOperation === 'recordLike') {
                        // Re-enable the specific like button if possible (might be tricky)
                        // For simplicity, could just ensure all like buttons are enabled
                         document.querySelectorAll('.like-btn:disabled').forEach(btn => btn.disabled = false);
                    }
                    // TODO: Potentially revert optimistic UI updates here if necessary
                    break;

                default:
                    // console.log("Received message of unknown type:", msg.type);
                    break;
            }
        } else {
             console.log("Received non-standard message:", event.data);
        }
    });

    /** Processes data received from Wix and updates the application state and UI */
    function populateDataFromWix(payload) {
        if (!payload || typeof payload !== 'object') {
            console.error("Invalid payload received in 'electionData' message.", payload);
            return;
        }
        console.log("Processing data from Wix...");
        let uiNeedsUpdate = false; // Flag to check if any data actually changed

        // 1. Update Candidates
        if (Array.isArray(payload.candidates)) {
            uiNeedsUpdate = true;
            candidates = []; candidateDetails = {}; candidateLikes = {}; candidateImages = {}; // Reset
            payload.candidates.forEach(c => {
                if (c && c.name) { // Ensure name exists
                    candidates.push(c.name);
                    candidateImages[c.name] = c.imageUrl || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
                    candidateDetails[c.name] = { age: c.age ?? '?', zone: c.zone ?? '?' };
                    candidateLikes[c.name] = c.likes ?? 0;
                }
            });
            console.log(`Updated ${candidates.length} candidates from Wix.`);
            // Re-populate lists only if candidate data actually changed significantly (optional optimization)
            populateCandidateList(presidentListEl, candidates, true);
            populateCandidateList(vicePresidentListEl, candidates, false);
        }

        // 2. Update Combo Vote Counts
        if (Array.isArray(payload.combos)) {
             uiNeedsUpdate = true;
            votesData = {}; // Reset vote counts
            payload.combos.forEach(c => {
                if (c && c.president && c.vicePresident) { // Ensure combo is valid
                    const key = `${c.president} & ${c.vicePresident}`;
                    votesData[key] = c.totalVotes ?? 0;
                    // Update candidate images if provided in combo data (might be redundant if also in candidate data)
                    // if (c.presidentImageUrl) candidateImages[c.president] = c.presidentImageUrl;
                    // if (c.vicePresidentImageUrl) candidateImages[c.vicePresident] = c.vicePresidentImageUrl;
                }
            });
             console.log(`Updated ${Object.keys(votesData).length} vote combos from Wix.`);
        }

        // 3. Update Comments (rebuild hierarchy)
        if (Array.isArray(payload.comments)) { // Assuming payload key is 'comments'
             uiNeedsUpdate = true;
            let allComments = [];
            comboComments = {}; // Reset comments
            payload.comments.forEach(comment => {
                // Use _id from database, ensure comboKey exists
                if (comment && comment._id && comment.comboKey) {
                    allComments.push({
                        id: comment._id, // Use the database ID
                        comboKey: comment.comboKey,
                        parentID: comment.parentId || 0, // Use parentId field from DB
                        name: comment.name || "Anonymous",
                        text: comment.text || comment.comment || "", // Allow 'comment' or 'text' field
                        replies: [] // Initialize replies array
                    });
                }
            });

            // Rebuild hierarchy (same logic as readUserDataTable)
            let commentsById = {};
            allComments.forEach(comment => commentsById[comment.id] = comment);
            allComments.forEach(comment => {
                if (comment.parentID !== 0 && commentsById[comment.parentID]) {
                    if (!commentsById[comment.parentID].replies) commentsById[comment.parentID].replies = [];
                    commentsById[comment.parentID].replies.push(comment);
                }
            });
            allComments.forEach(comment => {
                if (comment.parentID === 0) {
                    if (!comboComments[comment.comboKey]) comboComments[comment.comboKey] = [];
                    comboComments[comment.comboKey].push(comment);
                }
            });
             console.log("Updated comments structure from Wix data.");
        }

        // 4. Update Map State Data (raw data for processing)
        if (Array.isArray(payload.mapStates)) {
             uiNeedsUpdate = true;
            mapStatesData = payload.mapStates; // Store the raw data
             console.log(`Updated map data source with ${mapStatesData.length} state entries from Wix.`);
        }

        // 5. Update Loyalists
        if (Array.isArray(payload.loyalists)) {
             uiNeedsUpdate = true;
            loyalists = {}; // Reset loyalists
            payload.loyalists.forEach(l => {
                if (l && l.referralCode && l.combo) { // Require code and combo
                    loyalists[l.referralCode.toUpperCase()] = { // Standardize code
                        loyalistName: l.loyalistName || "Anonymous",
                        city: l.city || "Unknown",
                        combo: l.combo,
                        supporters: l.supporters ?? 0,
                        donation: l.donation ?? 0,
                        comboImg1: l.comboImg1 || 'https://placehold.co/50x50/cccccc/ffffff?text=P',
                        comboImg2: l.comboImg2 || 'https://placehold.co/50x50/cccccc/ffffff?text=V'
                    };
                }
            });
            console.log(`Updated ${Object.keys(loyalists).length} loyalists from Wix.`);
        }

        // Re-render UI components if any data was updated
        if (uiNeedsUpdate) {
            console.log("Wix data processed, re-rendering UI components...");
            renderChart();
            renderComboGrid();
            renderComboLoyalists();
            renderMap(); // Re-render map with potentially new state data
            renderPieChart(); // Re-render pie chart with new vote counts

            // Re-render comments only if the comment section is currently active
            if (currentCombo && comboCommentSection?.classList.contains('active')) {
                renderComboComments();
            }
            updateProgress(); // Update vote button state based on selections
            console.log("UI update complete.");
        } else {
            console.log("No new data fields found in Wix message to process.");
        }
    }

    // --- Initialization Function ---
    function init() {
        console.log("Initializing application...");

        // Attempt to read data from hidden tables as a fallback
        let readFromTables = false;
        if (!readFromTables) readFromTables = readCandidateTable();
        if (!readFromTables) readFromTables = readComboTable();
        if (!readFromTables) readFromTables = readUserDataTable();
        if (!readFromTables) readFromTables = readLoyalistDataTable();

        // Initial UI Population (might be overwritten by Wix data later)
        populateCandidateList(presidentListEl, candidates, true);
        populateCandidateList(vicePresidentListEl, candidates, false);
        renderChart();
        renderComboGrid();
        renderComboLoyalists();
        initMap(); // Initialize map structure
        renderPieChart();
        setupEventListeners(); // Setup all event listeners
        updateProgress(); // Initial check for vote button state
        startCountdown(); // Start the countdown timer
        updateUITranslations(); // Apply initial translations

        console.log("Initialization complete. Waiting for potential data from Wix...");

        // Optional: Send a message to Wix page requesting initial data
        // window.parent.postMessage({ type: 'requestInitialData' }, '*');
    }

    // --- Run Initialization ---
    init();

}); // End DOMContentLoaded
