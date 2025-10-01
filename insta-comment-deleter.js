(async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const batchSize = 15;
  const pauseBetweenBatches = 16000;

  let totalDeleted = 0;
  let batchNum = 0;

  while (true) {
    const selectBtn = [...document.querySelectorAll('span')]
      .find(el => el.innerText.trim().toLowerCase() === 'select');
    if (selectBtn) {
      selectBtn.click();
      console.log("🔵 Selection mode enabled.");
      await delay(800);
    }

    let checkIcons = [...document.querySelectorAll('div[data-bloks-name="ig.components.Icon"]')];
    let scrollAttempts = 0;
    while (checkIcons.length < batchSize && scrollAttempts < 8) {
      window.scrollBy(0, 800);
      await delay(2000);
      checkIcons = [...document.querySelectorAll('div[data-bloks-name="ig.components.Icon"]')];
      scrollAttempts++;
    }

    if (checkIcons.length === 0) {
      console.log("🎉 No more comments found. Finished!");
      break;
    }

    for (let i = 0; i < batchSize && i < checkIcons.length; i++) {
      checkIcons[i].click();
      await delay(200);
    }

    const bottomDelete = [...document.querySelectorAll('span')]
      .find(el =>
        el.innerText.trim().toLowerCase() === 'delete' &&
        el.offsetParent !== null
      );
    if (bottomDelete) {
      bottomDelete.click();
      console.log("🟥 Clicked bottom Delete button.");
      await delay(1200);

      const confirmDelete = [...document.querySelectorAll('div[role="dialog"] span, div[role="dialog"] button')]
        .find(el => el.innerText.trim().toLowerCase() === 'delete');
      if (confirmDelete) {
        confirmDelete.click();
        batchNum++;
        totalDeleted += Math.min(batchSize, checkIcons.length);
        console.log(`🗑️ Batch ${batchNum}: Deleted ~${totalDeleted} comments total.`);
      }
    }

    console.log("⏳ Waiting 15s+ for Instagram to load more comments...");
    await delay(pauseBetweenBatches);
  }

  console.log(`✅ Finished infinite deletion. Total deleted: ${totalDeleted}`);
})();
