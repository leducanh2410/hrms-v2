export class THONG_TIN_CHUNG{
    constructor() {
        this.nsID = null,
        this.donviId = null,
        this.donvi = null,
        this.sohieu = null,
        this.anhNs = null,
        this.tenkhaisinh = null,
        this.bidanh = null,
        this.tenthuonggoi = null,
        this.ngaysinh = null,
        this.loaiHDID = null,
        this.tenHD = null,
        this.gioitinh = null,
        this.phongban = null,
        this.phongbanId = null,
        this.quocgiaId = null,
        this.tenquocgia = null,
        this.dantocId = null,
        this.tendantoc = null,
        this.tongiaoId = null,
        this.tentongiao = null,
        this.socmnd = null,
        this.ngaycap = null,// Ngày cấp cmnd
        this.noicap = null,// Nơi cấp cmnd
        this.tpgiadinhId = null,
        this.tpgiadinh = null,
        this.tpbanthan = null,
        this.giadinhchinhsach = null,
        this.kieugdcsach = null,// Kiểu gia đình chính sách
        this.masothue = null,
        this.dienthoai = null,
        this.dienthoaiNoibo = null,
        this.email = null,
        this.nsTtphoId = null,
        this.nsQhId = null,
        this.nsChitiet = null,
        this.nsDaydu = null,
        this.qqTtphoId = null,
        this.qqQhId = null,
        this.qqChitiet = null,
        this.qqDaydu = null,
        this.ttTtphoId = null,
        this.ttQhId = null,
        this.ttChitiet = null,
        this.ttDaydu = null,
        this.chnTtphoId = null,
        this.chnQhId = null,
        this.chnChitiet = null,
        this.chnDaydu = null,
        this.vhoaPthong = null,
        this.idHhamCnhat = null,
        this.cnHochamId = null, // Chuyên ngành đào tạo
        this.nhomnganhId = null,
        this.cnHocham = null,
        this.idHviCnhat = null,
        this.chuyennganhHocvi = null,
        this.tenhocvi = null,
        this.namHocvi = null,
        this.namHocham = null,
        this.tdqlktId = null,
        this.noidtqlkte = null,
        this.namqlykte = null,
        this.llctTrinhdoId = null,
        this.noidtLlctri = null,
        this.llctHthucdtId = null,
        this.namlluanctri = null,
        /*-----------------------*/
        // Thong tin ve ngoai ngu cap nhat o day
        this.trinhdo_Anh = null,
        this.trinhdo_Phap = null,
        this.trinhdo_Nga = null,
        this.trinhdo_Nhat = null,
        this.trinhdo_Trung = null,
        /*-----------------------*/
        this.ngaytuyendung = null,
        this.coquan = null,// Ô text vào cơ quan nào, ở đâu
        this.nntruoctdId = null,// nghê nghiệp trước tuyển dụng
        this.ngayvaonganh = null,
        this.ngayvaodonvi = null,
        this.ngayvaodonviHdld = null,
        this.sohopdongld = null,
        this.chucvuId = null,
        this.ngaybonhiem = null,
        this.vitrichucdanh = null,
        this.vtriId = null,
        this.nghecnktId = null,
        this.nghecnkt = null,

        this.tenChucvuDoanthe = null,
        this.cvuDtheId = null,
        this.bacluongId = null,// Mã bậc lương
        this.tenbangluong = null,
        this.bacluong = null,
        this.bachienthi = null,
        this.heso = null,
        this.hesobaoluu = null,
        this.tghuonggannhat = null,
        this.soxoBHXH = null,
        this.sotheBHYT = null,
        this.tomtatquatrinhct = null,
        this.capnhatquatrinhct = null,
        this.suckhoe = null,
        this.nhandang = null,
        this.ddlsbanthan = null,// Đặc điểm lịch sử bản thân
        this.nlsotruong = null,
        this.cvdalamlaunhat = null,
        this.danhhieuduocphong = null,
        this.qhvoinguoinuocngoai = null,
        this.hcktgiadinh = null,
        this.tunxbanthan = null,// Tự nhận xét bản thân
        this.lylichBo = null,
        this.lylichme = null,
        this.lylichvo = null,
        this.caccon = null,// Lý lịch các con
        this.anhchiem = null,// lý lịch anh chị em
        this.lylichbovo = null,
        this.lylichmevo = null,
        this.llanhchiemvo = null,
        this.bodoi = null,
        this.ngaynhapngu = null,
        this.ngayxnlydo = null,
        this.chucvucaonhat = null,
        this.ngayvaodang = null,
        this.noiketnap = null,
        this.ngayvaochinhthuc = null,
        this.sothedang = null,
        this.ngayroidang = null,
        this.ngayvaodoan = null,
        this.noiketnapdoan = null,
        this.ngaytthanhdoan = null,
        this.ngayvaocdoan = null,
        this.noivaocdoan = null,
        this.sothecdoan = null,
        this.thongtinkhac = null,
        this.moctinhnangluong = null,
        this.nsLlnsGiadinhlist = null,
        this.nsLlnsBoxungList = null,
        // ngành sxkd
        this.nganhSxkdId = null,
        // thong tin user
        this.userName = null,
        this.isAcountDomain = null,
        this.nsQtlamviecGocId = null,// id quá trình làm việc gốc
        this.nsHdldGocId = null,// id hđlđ gốc
        this.nsNganhSxkdGocId = null,// id ngành sxkd gốc

        this.noikhambenh = null,
        this.sotk = null,
        this.nganhangId = null,
        this.chinhanhNH = null,
        this.chutk = null,
        this.webRole = null,
        this.ttranghonnhanId = null
        this.fileAttach = null,
        this.isNghiviec = false
    }
    is_create: any;
    nsID?: number;
	donviId?: number;
    donvi?: string;
	sohieu?: string;
	anhNs?: string;
	tenkhaisinh?: string;
	bidanh?: string;
	tenthuonggoi?: string;
	ngaysinh?: Date;
	loaiHDID?: number;
	tenHD?: string;
	gioitinh?: boolean;
	phongban?: string;
	phongbanId?: number;
	quocgiaId?: number;
	tenquocgia?: string;
	dantocId?: number;
	tendantoc?: string;
	tongiaoId?: number;
	tentongiao?: string;
	socmnd?: string;
	ngaycap?: Date;// Ngày cấp cmnd
	noicap?: string;// Nơi cấp cmnd
	tpgiadinhId?: number;
	tpgiadinh?: string;
	tpbanthan?: string;
	giadinhchinhsach?: boolean;
	kieugdcsach?: string;// Kiểu gia đình chính sách
	masothue?: string;
	dienthoai?: string;
	dienthoaiNoibo?: string;
	email?: string;
	nsTtphoId?: number;
	nsQhId?: number;
	nsChitiet?: string;
	nsDaydu?: string;
	qqTtphoId?: number;
	qqQhId?: number;
	qqChitiet?: string;
	qqDaydu?: string;
	ttTtphoId?: number;
	ttQhId?: number;
	ttChitiet?: string;
	ttDaydu?: string;
	chnTtphoId?: number;
	chnQhId?: number;
	chnChitiet?: string;
	chnDaydu?: string;
	vhoaPthong?: string;
	idHhamCnhat?: number;
	cnHochamId?: number; // Chuyên ngành đào tạo
	nhomnganhId?: number;
	cnHocham?: string;
	idHviCnhat?: number;
	chuyennganhHocvi?: number;
	tenhocvi?: string;
	namHocvi?: number;
	namHocham?: number;
	tdqlktId?: number;
	noidtqlkte?: string;
	namqlykte?: number;
	llctTrinhdoId?: number;
	noidtLlctri?: string;
	llctHthucdtId?: number;
	namlluanctri?: number;
	/*-----------------------*/
	// Thong tin ve ngoai ngu cap nhat o day
	trinhdo_Anh?: number;
	trinhdo_Phap?: number;
	trinhdo_Nga?: number;
	trinhdo_Nhat?: number;
	trinhdo_Trung?: number;
	/*-----------------------*/
	ngaytuyendung?: Date;
	coquan?: string;// Ô text vào cơ quan nào, ở đâu
	nntruoctdId?: number;// nghê nghiệp trước tuyển dụng
	ngayvaonganh?: Date;
	ngayvaodonvi?: Date;
	ngayvaodonviHdld?: Date;
	sohopdongld?: string;
	chucvuId?: number;
	ngaybonhiem?: Date;
	vitrichucdanh?: string;
	vtriId?: number;
	nghecnktId?: number;
	nghecnkt?: string;

	tenChucvuDoanthe?: string;
	cvuDtheId?: number;
	//?   tructiepsx; boolean
	bacluongId?: number;// Mã bậc lương
	tenbangluong?: string;
	bacluong?: number;
	bachienthi?: string;
	heso?: number;
	hesobaoluu?: number;
	tghuonggannhat?: Date;
	soxoBHXH?: string;
	sotheBHYT?: string;
	tomtatquatrinhct?: string;
	capnhatquatrinhct?: string;
	suckhoe?: string;
	nhandang?: string;
	ddlsbanthan?: string;// Đặc điểm lịch sử bản thân
	nlsotruong?: string;
	cvdalamlaunhat?: string;
	danhhieuduocphong?: string;
	qhvoinguoinuocngoai?: string;
	hcktgiadinh?: string;
	tunxbanthan?: string;// Tự nhận xét bản thân
	lylichBo?: string;
	lylichme?: string;
	lylichvo?: string;
	caccon?: string;// Lý lịch các con
	anhchiem?: string;// lý lịch anh chị em
	lylichbovo?: string;
	lylichmevo?: string;
	llanhchiemvo?: string;
	bodoi?: boolean;
	ngaynhapngu?: Date;
	ngayxnlydo?: string;
	chucvucaonhat?: string;
	ngayvaodang?: Date;
	noiketnap?: string;
	ngayvaochinhthuc?: Date;
	sothedang?: string;
	ngayroidang?: Date;
	ngayvaodoan?: Date;
	noiketnapdoan?: string;
	ngaytthanhdoan?: Date;
	ngayvaocdoan?: Date;
	noivaocdoan?: string;
	sothecdoan?: string;
	thongtinkhac?: string;
	moctinhnangluong?: Date;
	nsLlnsGiadinhlist?: any[];
	nsLlnsBoxungList?: any[];
	// ngành sxkd
	nganhSxkdId?: number;
	// thong tin user
	userName?: string;
	isAcountDomain?: boolean;
	nsQtlamviecGocId?: number;// id quá trình làm việc gốc
	nsHdldGocId?: number;// id hđlđ gốc
	nsNganhSxkdGocId?: number;// id ngành sxkd gốc

	noikhambenh?: string;
	sotk?: string;
	nganhangId?: number;
	chinhanhNH?: string;
	chutk?: string;
    webRole?: string;
    ttranghonnhanId?: number;
    fileAttach?: any;
    isNghiviec?: boolean;
}
