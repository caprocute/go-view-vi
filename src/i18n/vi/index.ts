import login from './login'
import project from './project'

const global = {
  doc_addr: 'Tài liệu',
  code_addr: 'Mã',
  form_account: 'Vui lòng nhập tài khoản hoặc email của bạn',
  form_password: 'Vui lòng nhập mật khẩu của bạn',
  // header
  doc: 'Tài liệu',
  help: 'Trợ giúp',
  contact: 'Về phần mềm',
  logout: 'Đăng xuất',
  logout_success: 'Đăng xuất thành công!',
  logout_failure: 'Đăng xuất thất bại!',
  // system setting
  sys_set: 'Cài đặt hệ thống',
  lang_set: 'Cài đặt ngôn ngữ',
  // right key
  r_edit: 'Chỉnh sửa',
  r_preview: 'Xem trước',
  r_copy: 'Sao chép',
  r_rename: 'Đổi tên',
  r_publish: 'Xuất bản',
  r_unpublish: 'Hủy xuất bản',
  r_download: 'Tải xuống',
  r_delete: 'Xóa',
  r_more: 'Thêm',
}

const edit = {
  BarChart: 'Biểu đồ thanh',
  LineChart: 'Biểu đồ đường',
  No_layer_yet: 'Chưa có lớp nào',
  Workspace: 'Không gian làm việc',
  CopyrightNotice: 'Thông báo bản quyền',
  Copyright_belongs_to: 'Bản quyền thuộc về',
  Project_Author: 'Tác giả dự án',
  Protocol_Notes: 'Ghi chú giao thức',
  Please_comply_with_the_open_source_MIT_agreement: 'Vui lòng tuân thủ thỏa thuận MIT mã nguồn mở',
  The_above_statement: 'Tuyên bố trên',
  Cannot_be_deleted: 'Không thể bị xóa',
  Otherwise_it_will_be_regarded_as_infringement: 'Nếu không sẽ bị coi là vi phạm bản quyền',
}

const http = {
  error_message: 'Giao diện không bình thường, vui lòng kiểm tra giao diện!',
  token_overdue_message: 'Đăng nhập hết hạn, vui lòng đăng nhập lại!'
}

const chart = {
  BarChart: 'Biểu đồ thanh',
  LineChart: 'Biểu đồ đường',
  Open: 'Mở',
  The_legend_will_be_automatically_hidden: 'Chú thích sẽ được ẩn tự động',
}

export default {
  global,
  http,
  login,
  project,
  edit,
  chart
}
