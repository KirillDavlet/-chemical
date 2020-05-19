import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/authRouter/home/home'
import Adminka from '@/components/authRouter/administration/administration'
import TechnicalSupport from "@/components/authRouter/support/queryTableSupport/queryTableSupport"

//WIKI
import Wiki from '@/components/authRouter/wiki/wiki'
import wikiOrganization from '@/components/authRouter/wiki/wikiOrganization'
import wikiUsefulLinks from '@/components/authRouter/wiki/wikiUsefulLinks'
import innovation from '@/components/authRouter/wiki/innovation/innovation'


//FileStorage
import fileStorage from "@/components/authRouter/fileStorage/fileStorage";

///ТЕСТИРОВАНИЕ
import newTest from '@/components/testings/newTest/newTest'


//НАстройки
//Настройки темы
import settingsTheme from "@/components/authRouter/settings/settings-theme/settingsTheme";
import settingsWidgets from "@/components/authRouter/settings/settings-widgets/settingsWidget";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id',
      name: 'Home',
      component: Home
    },
    {
      path: '/:id/wiki',
      name: 'Wiki',
      component: Wiki
    },
    {
      path: '/:id/wiki/organization',
      name: 'organization',
      component: wikiOrganization
    },
    {
      path: '/:id/wiki/usefulLinks',
      name: 'полезные ссылки',
      component: wikiUsefulLinks
    },
    {
      path: '/:id/wiki/innovation',
      name: 'нововедения',
      component: innovation
    },
    {
      path: '/:id/administration',
      name: 'Administration',
      component: Adminka
    },
    {path: `/:id/testings/newTest`, name: 'newTest', component: newTest},
    {path: '/:id/storageFile', name: 'fileStorage', component: fileStorage},
    {path: '/:id/support', name: 'support', component: TechnicalSupport},
    {path: '/:id/settings/theme', name: 'settingsTheme', component: settingsTheme},
    {path: '/:id/settings/widgets', name: 'settingsWidgets', component: settingsWidgets},
  ]
})
