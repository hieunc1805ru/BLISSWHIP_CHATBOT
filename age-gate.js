(function () {
  try {
    if (sessionStorage.getItem('bw_age_verified') === '1') return;
  } catch (e) {}

  var overlay = document.createElement('div');
  overlay.id = 'bw-age-gate';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,10,10,0.94);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;';

  var box = document.createElement('div');
  box.style.cssText = 'background:#fff;max-width:460px;width:100%;border-radius:16px;padding:32px 28px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.4);';

  box.innerHTML =
    '<div style="font-size:40px;margin-bottom:12px;">🔞</div>' +
    '<h2 style="color:#c62828;font-size:22px;margin-bottom:14px;">Age Verification Required</h2>' +
    '<p style="color:#333;font-size:15px;line-height:1.6;margin-bottom:10px;">BlissWhip nitrous oxide (N2O) cream chargers are food-grade products intended for culinary use only, and are legally restricted to adult purchasers.</p>' +
    '<p style="color:#333;font-size:15px;line-height:1.6;margin-bottom:22px;">You must be <strong>at least 18 years old</strong> to enter this site (<strong>21+ in New York</strong>). By clicking "I am 18+", you confirm you meet the minimum age requirement in your state.</p>' +
    '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">' +
      '<button id="bw-age-confirm" style="background:#111;color:#fff;border:none;border-radius:30px;padding:12px 26px;font-weight:bold;font-size:15px;cursor:pointer;">I am 18+ — Enter Site</button>' +
      '<button id="bw-age-exit" style="background:#f2f2f2;color:#333;border:none;border-radius:30px;padding:12px 26px;font-weight:bold;font-size:15px;cursor:pointer;">Exit</button>' +
    '</div>';

  overlay.appendChild(box);

  function mount() {
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(overlay);
    document.getElementById('bw-age-confirm').addEventListener('click', function () {
      try { sessionStorage.setItem('bw_age_verified', '1'); } catch (e) {}
      document.documentElement.style.overflow = '';
      overlay.remove();
    });
    document.getElementById('bw-age-exit').addEventListener('click', function () {
      window.location.href = 'https://www.google.com';
    });
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
