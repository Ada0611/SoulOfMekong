export const project = {
  name: 'SoulOfMekong',
  tagline: 'Giữ hồn miền Tây, kể chuyện hôm nay.',
  university: 'FPT University — Campus Can Tho',
  course: 'SSG105 | Student Project: Creating Social Solutions',
  className: '1-TM2001',
  reportDate: '05/11/2026',
  members: ['Huỳnh Như Ý (Leader)','Nguyễn Trúc Mai','Trần Hà Bảo Trân','Lâm Thanh Tuấn','Nguyễn Võ Nhật Duy'].map(n => ({ name: n, share: 20 })),
  nav: [
    { to: '/', label: 'Trang chủ' }, { to: '/cau-chuyen', label: 'Câu chuyện' },
    { to: '/video', label: 'Video' }, { to: '/thu-vien-anh', label: 'Thư viện ảnh' }, { to: '/ve-du-an', label: 'Về dự án' },
  ],
};
const B = 'https://lh3.googleusercontent.com/aida-public/';
export const img = {
  hero: B+'AB6AXuBg6PUsjWbz9yVzFSSdBvBRFRYd60XsL4SFP4w9Xo5RFBpk6oxU_GZx10PS1tK1do594GyZRzVUay9KAg7_u946vuFWtxcCZqQM2K_shdd_UTrzJ6zs5Lu0QKS7nTm1mHrsMcGuRlsscg740ZhTSBr1ogCnI2Bm27T0IDlqi0bzlpN48NwLpjmfp8WSUYsMyKlVBG76pfwkoHZTTDryL9eXV6xrRAnodXWVerPhKOYq4HgaV-9LzGjV',
  chonoi: B+'AB6AXuAIfzmU8-Lzzr-BIPEKagedI-PxXNIDDH7-pyrUiCqi1gHT3cFAnqQm5R1uLF5-6sEVxN-bn0Jz5x7G8DCU0hRrvMN23j42kpF5EhydC_KnErsLmg0udzYzC7F5zqNt1xSQzZ7E1W0lnYCQ8nhoK-vHvy52w4gemRlztSoO-sBfAHUh6eSPmUtq_04VsU6z_RTwQbPDBLABZb1fpO8Lj7IKeTbJXifilpdaYCB4kblqCxhX9bjSLLbW',
  chieu: B+'AB6AXuBHbAUNt9RnxFfxEtREzj0-8I-Hc9ttx0NQejhMcnS2uBn6j72OPExuEQDx_ZF5tP8Yz_hpb_A1BA82OhDYNcn82hsEct-RPMD6w6QAlV5bW0O1WR7pQBgB1AzGC4-BJrIGcPJR6iyJAXXG0biMIKsIytBaVRFL_sgTlY6nimPdfPjEf3X2NnXVyCmludVK3cghyq9aMzbkKYWbl-vZ-VPRTN6QpWZqPwa-tNbr6zfLumIh-YfP7xhb',
  phunu: B+'AB6AXuBfaIzvWoqT7GcN6OPXdb6StUgJ9fbt_a3heYGq0hitcEl-BP1R1x0DIK65Cnjyr7zxbyfMiDBWu_v2fCgLN_aDKEiaFCKK9B8-_CYYAvUKeg0Fh6Zv6PRibajQVJNGch25Iq_hqfYhXDQSxS1Zm78Vb8hleqJt0ggHLRalNm2wPqg-bUdZm3qkhYSd4jsLqlKpgietrqCjiWATnMaosjUQUqr5DKMLqVmvjjq6wln7mb49j723yNMk',
  tre: B+'AB6AXuDxoYD1GU3ROnwSAeZUTz6f2tGkdEM59yNjeC-fw9sA0pxKgBfZV-ef17zi5LzY0ipZZRMzpJt3MH9OLwBr5n59awG9vgdroiXO2TrQNbZgxJ_Kh-lF6BN7jo0lz0HGKHotoocgKIKA6p1VkOzgXw5_gkHKQhoMeXYVnQxZ8vxfCauH0UjqE5mA1xPaZEOiO9m6uvfchWeyXz5STT5uBXjk5Wv2ZLkOPPS8_ocSg6C-JJ-au-Yr3-kb',
  xuong: B+'AB6AXuBL-vKnlUPMIxpKzbXaIC6WBCGcRSFKy5v_Ht1QA622RArhTcw1A8Cb-qFDpO81bR9VHTMRfDjx_HoTD8zSYlX2TjNHnNwiZKiE9s8aj6-9rARavA9iSly-sN_LBfObtWma-3bGACxCp9Uocb1I3s-hxGH8V3NZIzNLX5yaEsQ3jB7IrGzlAt5SspWzd5wYkewcFvIXGTvdUpt3wpEUW8T2m8Xp_Cg5Oa9QPdvxFTyfhRaFMM4kV5va',
  amthuc: B+'AB6AXuDJ1uFJkyYhrvcxqBbNKyM_erLZcnMLr0qlEmenJvDaPniizrTZePwnmkGBzYTxoIWL8Ff6T_UZlKfwmSiQo4Jin-9k6fHOSw9C4FBU9xGpyec-ne0uR4XI7oqXMhjuz3kt_ZkGBbK8Auv2oqFgBTfOxIVhAYwS5b7u2EW4-Zy3G4ouD0ifwRKxGAFx5UKqmUI3ksHBrbk2iNTi36ZmznrqPs54_ffVu7USqpMWC-rIWIptEnCNCyWF',
  dca: B+'AB6AXuACWWPHy__JyPAntBx100EMGbks6g2iY02mwsiNu-3o8pY5lrVNaxCJbEh2WDkAFPfCvKRG_nT0gt7fAt4dwJlaw19bccE5hSlQRm7eH6xDn5lzIM9IpfLnczewFNvH9hxKeDTHF9lyMI0WwjWAiahJmjv1N4gRow4JDEyiuAggd2B78zcLY6nGutX9mdD03uvWGI8ylNeKP4GCDwKX4WnIuoKVUXXwbW-8BuYt5lZGZWoBNXFw4-j3',
  sv: B+'AB6AXuAvBniYRif1ah4dCfFyoRkT_ugygMJzS57Y22J42_jFBV1Gn5NMaceh130E-E32NfTQ-m2K4HPqS-ciBYok0l-4nWFS8BHNahAbQ3TwsJDdZSsaASKLjguHOgljLWXpCTDRghvs5dy2RO7jGbwalmaN_n75fflaZsdUaId4L1X8WYsVssRo7D2y2fKLZlc7ncv3iLGs5rZCN0WE-2usJmZg36uhzNu_Vc-BERIUkqo54vzfIg_kKpso',
  v1: B+'AB6AXuBe-iyYv-jMo_fJcKaFmqV9M802eDclq0Wo7zjdcqdhzkGA4btH4FDRH27z48TdpkN95V58s9V8qRbfFIagIV0yFqyQQf1CYEXyE4o85JiCHmXHk0uQEDdTBTarYIjpbqTU7TmgKlomthC18bDhHNW7bXs29CckOI9vaZXxmrlY8Lkx5hSkwbQenPpxLIPaXOyrYPdcWVrKl4UsTt91wnrNvYo68aQNTaXiJNKXVNKDR96eWBU4qbZX',
  v2: B+'AB6AXuAr5QKqG78MQxBPAp2ilKYtBY7277yq6fLygNYE949piy45yQFHGXlpFmyRph1H0IKqmNh8MfUE4qfU1Yo7nuL5LnsZSaC0vIC4BhMDeZ3qhTalF5a6UumIlDWIz_amIvbE3pJTwGaRDfV8I2SWlKfXhKaWUMC0bgWdSikk3LlvQL6dR4DzsILh6G2SgsE2jzf-pR4qgUwxeUbmiMt1l0lScJdt805EhCTZnoj1vq3HyBF0MEQ9TUP7',
  v3: B+'AB6AXuBMvCZvdXetsxq5wUdBHogBrb-EEc1jpEZs4PgFX5I1LIPm23QoXLlinudooGMY6MTZgyd-Dc_PR2sSyu_1Dtqn1q7LQH7xE7ngTljznPRsq2r7y7wAPKyNLOFCVlGjETMcEV1JtrYmBxwwSuvxGyJRWKA6d4DsKMX4UvxQHr06bXaQFHAcdpoIuOuh42kHVH2gZ2W2oJx6RtfuXwKX74oG4SZL9-2XY52CeHlHNRWlCr-S9ynYFNuA',
};
