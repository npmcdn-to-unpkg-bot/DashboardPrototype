module.exports = {
    database: {
      user: process.env.dd_user || 'brm_cpt_servicebrmdemoadmin',
      password: process.env.dd_password || 'Complex123',
      connectString: process.env.dd_connectString || 'ausmg12cdedbscn.us.dell.com:1521/pindv_default.dev.amer.dell.com'
    }
}