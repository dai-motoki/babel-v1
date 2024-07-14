# システムの初期化処理をここに記述
# i18n設定
from i18n import load_path, set as set_i18n
load_path.append('./locales')
set_i18n('locale', 'ja')
