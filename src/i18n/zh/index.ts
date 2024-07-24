import login from './login'
import project from './project'

const global = {
  doc_addr: 'Document',
  code_addr: 'Code',
  form_account: 'Please enter your account or email',
  form_password: 'Please enter your password',
  // header
  doc: 'Document',
  help: 'Help',
  contact: 'About Software',
  logout: 'Logout',
  logout_success: 'Logout success！',
  logout_failure: 'Logout Failed！',
  // system setting
  sys_set: 'System Setting',
  lang_set: 'Language Setting',
  // right key
  r_edit: 'Edit',
  r_preview: 'Preview',
  r_copy: 'Clone',
  r_rename: 'Rename',
  r_publish: 'Publish',
  r_unpublish: 'Unpublish',
  r_download: 'Download',
  r_delete: 'Delete',
  r_more: 'More',
}
const edit = {
  BarChart: 'Bar Chart',
  LineChart: 'Line Chart',
  No_layer_yet: "No layer yet",
  Workspace: 'Workspace',
  CopyrightNotice: 'Copyright Notice',
  Copyright_belongs_to: "Copyright belongs to",
  Project_Author: "Project Author",
  Protocol_Notes: "Protocol Notes",
  Please_comply_with_the_open_source_MIT_agreement: "Please comply with the open source MIT agreement",
  The_above_statement: "The above statement",
  Cannot_be_deleted: "Cannot be deleted",
  Otherwise_it_will_be_regarded_as_infringement: "Otherwise it will be regarded as infringement",
}
const http = {
  error_message: 'The interface is abnormal, please check the interface!',
  token_overdue_message: 'Login expired, please log in again!'
}

const chart = {
  BarChart:'Bar Chart',
  LineChart:'Line Chart',
  Open: 'Open',
  The_legend_will_be_automatically_hidden:'The legend will be automatically hidden',
}
export default {
  global,
  http,
  login,
  project,
  edit,
  chart
}
