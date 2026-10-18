// Ritter Manager – Start
unlCheck();
if(!S.lvl0)S.lvl0=lvl();
if(!Array.isArray(S.sk))S.sk=SK.filter(s=>s.id!=="hieb"&&s.lv<=lvl()).slice(-SK_MAX).map(s=>s.id);
if(!S.q||S.q.day!==S.day)qGen();
home();
