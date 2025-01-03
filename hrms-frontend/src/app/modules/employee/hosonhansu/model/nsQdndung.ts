export class NsQdndung {
      qdinhId ?: number;
	  soQd ?: string;
	  donviId?: number;
	  nguoiky  ?: string;
	  chucvuKy  ?: string;
	  ngayKy ?: Date;
	  namqd?: number;
	  loaiqd ?: string;
	  noiDung?: string;
	  idCapktkl?: string;
	  fileName?: string;
	  fileExtend?: string;
	  deleted ?: boolean;
	  createTime?: Date;
	  updateTime?: Date;
	  createUser?: string;
	  updateUser?: string;
	  checkAct ?: boolean;
	  isChangeFileAttach ?: boolean;
      fileAttach ?: any

      constructor() {
        this.qdinhId = 0;
        this.soQd = '';
        this.donviId = 0;
        this.nguoiky  = '';
        this.chucvuKy = '';
        this.ngayKy = new Date();
        this.namqd= 0;
        this.loaiqd = '';
        this.noiDung = '';
        this.idCapktkl = '';
        this.fileName = '';
        this.fileExtend = '';
        this.deleted = false;
        this.createTime = new Date();
        this.updateTime = new Date();
        this.createUser = '';
        this.updateUser = '';
        this.isChangeFileAttach = false;
        this.fileAttach = null
      }
}