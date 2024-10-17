const { PrismaClient } = require('@prisma/client');
const { getGamesEurope } = require('nintendo-switch-eshop');

const prisma = new PrismaClient();

// Define the locales you want to fetch data for
const europeanCountryCodes = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ru']; // Add more as needed

async function getProducts() {
  let allResults = [];

  // Loop through each country code and fetch data
  for (const countryCode of europeanCountryCodes) {
    const options = {
      limit: 10, // Adjust the limit if needed
      locale: countryCode.toLowerCase(), // Use the lowercase country code
    };

    try {
//      const result = await getGamesEurope(options);

      // for (const game of result) {
      //   const gameData = {
      //     fs_id: game.fs_id,
      //     change_date: new Date(game.change_date),
      //     url: game.url,
      //     type: game.type,
      //     dates_released_dts: game.dates_released_dts.map(date => new Date(date)),
      //     club_nintendo: game.club_nintendo,
      //     pretty_date_s: game.pretty_date_s,
      //     play_mode_tv_mode_b: game.play_mode_tv_mode_b,
      //     play_mode_handheld_mode_b: game.play_mode_handheld_mode_b,
      //     product_code_txt: game.product_code_txt,
      //     image_url_sq_s: game.image_url_sq_s,
      //     deprioritise_b: game.deprioritise_b,
      //     demo_availability: game.demo_availability,
      //     pg_s: game.pg_s,
      //     compatible_controller: game.compatible_controller,
      //     originally_for_t: game.originally_for_t,
      //     paid_subscription_required_b: game.paid_subscription_required_b,
      //     cloud_saves_b: game.cloud_saves_b,
      //     priority: new Date(game.priority),
      //     digital_version_b: game.digital_version_b,
      //     title_extras_txt: game.title_extras_txt,
      //     image_url_h2x1_s: game.image_url_h2x1_s,
      //     system_type: game.system_type,
      //     age_rating_sorting_i: game.age_rating_sorting_i,
      //     game_categories_txt: game.game_categories_txt,
      //     play_mode_tabletop_mode_b: game.play_mode_tabletop_mode_b ?? false,
      //     publisher: game.publisher,
      //     product_code_ss: game.product_code_ss,
      //     excerpt: game.excerpt,
      //     nsuid_txt: game.nsuid_txt,
      //     date_from: new Date(game.date_from),
      //     language_availability: game.language_availability,
      //     price_has_discount_b: game.price_has_discount_b,
      //     product_catalog_description_s: game.product_catalog_description_s,
      //     related_nsuids_txt: game.related_nsuids_txt,
      //     price_discount_percentage_f: game.price_discount_percentage_f,
      //     title: game.title,
      //     sorting_title: game.sorting_title,
      //     wishlist_email_square_image_url_s: game.wishlist_email_square_image_url_s,
      //     players_to: game.players_to,
      //     wishlist_email_banner640w_image_url_s: game.wishlist_email_banner640w_image_url_s,
      //     paid_subscription_online_play_b: game.paid_subscription_online_play_b,
      //     playable_on_txt: game.playable_on_txt,
      //     hits_i: game.hits_i,
      //     pretty_game_categories_txt: game.pretty_game_categories_txt,
      //     title_master_s: game.title_master_s,
      //     switch_game_voucher_b: game.switch_game_voucher_b,
      //     game_category: game.game_category,
      //     system_names_txt: game.system_names_txt,
      //     pretty_agerating_s: game.pretty_agerating_s,
      //     price_regular_f: game.price_regular_f,
      //     eshop_removed_b: game.eshop_removed_b,
      //     age_rating_type: game.age_rating_type,
      //     price_sorting_f: game.price_sorting_f,
      //     price_lowest_f: game.price_lowest_f,
      //     age_rating_value: game.age_rating_value,
      //     physical_version_b: game.physical_version_b,
      //     wishlist_email_banner460w_image_url_s: game.wishlist_email_banner460w_image_url_s,
      //     downloads_rank_i: game.downloads_rank_i,
      //     version: game._version_,
      //   };

      //   console.log("gameData.fs_id" , gameData.fs_id);
      //   //Save the game data to the database
      //   await prisma.nintendoData.create({
      //     data: {
      //       ...gameData,
      //       version: String(gameData.version)
      //     }
      //   });
      // }
      // allResults = await prisma.nintendoData.findFirst({});
      allResults = await prisma.nintendoData.findMany({});

    } catch (error) {
      console.error(
        `Failed to fetch data for country code ${countryCode}: ${error.message}`
      );
    }
  }

  return allResults;
}

async function clearNintendoData() {
  try {
    const result = await prisma.nintendoData.deleteMany({});
    console.log(`Deleted ${result.count} records from the NintendoData table.`);
  } catch (error) {
    console.error('Error clearing NintendoData table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { getProducts };

// clearNintendoData()
// Process and save each game data to the database
// for (const game of result) {
//   // Map the result to transform each game object according to your schema
//   const gameData = {
//     fs_id: game.fs_id,
//     change_date: new Date(game.change_date),
//     url: game.url,
//     type: game.type,
//     dates_released_dts: game.dates_released_dts.map(date => new Date(date)),
//     club_nintendo: game.club_nintendo,
//     pretty_date_s: game.pretty_date_s,
//     play_mode_tv_mode_b: game.play_mode_tv_mode_b,
//     play_mode_handheld_mode_b: game.play_mode_handheld_mode_b,
//     product_code_txt: game.product_code_txt,
//     image_url_sq_s: game.image_url_sq_s,
//     deprioritise_b: game.deprioritise_b,
//     demo_availability: game.demo_availability,
//     pg_s: game.pg_s,
//     compatible_controller: game.compatible_controller,
//     originally_for_t: game.originally_for_t,
//     paid_subscription_required_b: game.paid_subscription_required_b,
//     cloud_saves_b: game.cloud_saves_b,
//     priority: new Date(game.priority),
//     digital_version_b: game.digital_version_b,
//     title_extras_txt: game.title_extras_txt,
//     image_url_h2x1_s: game.image_url_h2x1_s,
//     system_type: game.system_type,
//     age_rating_sorting_i: game.age_rating_sorting_i,
//     game_categories_txt: game.game_categories_txt,
//     play_mode_tabletop_mode_b: game.play_mode_tabletop_mode_b ?? false,
//     publisher: game.publisher,
//     product_code_ss: game.product_code_ss,
//     excerpt: game.excerpt,
//     nsuid_txt: game.nsuid_txt,
//     date_from: new Date(game.date_from),
//     language_availability: game.language_availability,
//     price_has_discount_b: game.price_has_discount_b,
//     product_catalog_description_s: game.product_catalog_description_s,
//     related_nsuids_txt: game.related_nsuids_txt,
//     price_discount_percentage_f: game.price_discount_percentage_f,
//     title: game.title,
//     sorting_title: game.sorting_title,
//     wishlist_email_square_image_url_s: game.wishlist_email_square_image_url_s,
//     players_to: game.players_to,
//     wishlist_email_banner640w_image_url_s: game.wishlist_email_banner640w_image_url_s,
//     paid_subscription_online_play_b: game.paid_subscription_online_play_b,
//     playable_on_txt: game.playable_on_txt,
//     hits_i: game.hits_i,
//     pretty_game_categories_txt: game.pretty_game_categories_txt,
//     title_master_s: game.title_master_s,
//     switch_game_voucher_b: game.switch_game_voucher_b,
//     game_category: game.game_category,
//     system_names_txt: game.system_names_txt,
//     pretty_agerating_s: game.pretty_agerating_s,
//     price_regular_f: game.price_regular_f,
//     eshop_removed_b: game.eshop_removed_b,
//     age_rating_type: game.age_rating_type,
//     price_sorting_f: game.price_sorting_f,
//     price_lowest_f: game.price_lowest_f,
//     age_rating_value: game.age_rating_value,
//     physical_version_b: game.physical_version_b,
//     wishlist_email_banner460w_image_url_s: game.wishlist_email_banner460w_image_url_s,
//     downloads_rank_i: game.downloads_rank_i,
//     version: game._version_,
//   };

//   //Save the game data to the database
//   await prisma.nintendoData.create({
//     data: {
//       ...gameData,
//       version: String(gameData.version)
//     }
//   });

// }

 // Map the result to transform each game object
      // const transformedResult = result.map((game) => {
      //   return {
      //     name: game.title,
      //     stock: "Stock",
      //     price: game.price_regular_f,
      //     provider: "Nintendo",
      //     region: countryCode, // Use the current country code
      //     sku: game.product_code_txt[0],
      //     publisher: game.publisher,
      //     status: "Active",
      //     createdAt: game.pretty_date_s
      //   };
      // });