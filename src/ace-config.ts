import ace from 'ace-builds'

import modeSqlserverUrl from 'ace-builds/src-noconflict/mode-sqlserver?url'
import modeMySqlUrl from 'ace-builds/src-noconflict/mode-mysql?url'
import modeSqlUrl from 'ace-builds/src-noconflict/mode-sql?url'
import themeSqlserverUrl from 'ace-builds/src-noconflict/theme-sqlserver?url'
import snippetsSqlserverUrl from 'ace-builds/src-noconflict/snippets/sqlserver?url'
import extSearchBoxUrl from 'ace-builds/src-noconflict/ext-searchbox?url'
import 'ace-builds/src-noconflict/ext-language_tools'

ace.config.setModuleUrl('ace/mode/sqlserver', modeSqlserverUrl)
ace.config.setModuleUrl('ace/mode/sql', modeSqlUrl)
ace.config.setModuleUrl('ace/mode/mysql', modeMySqlUrl)

ace.config.setModuleUrl('ace/theme/sqlserver', themeSqlserverUrl)

ace.config.setModuleUrl('ace/snippets/sqlserver', snippetsSqlserverUrl)

ace.config.setModuleUrl('ace/ext/searchbox', extSearchBoxUrl)

ace.require('ace/ext/language_tools')
