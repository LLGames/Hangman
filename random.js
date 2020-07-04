let taken_item = []

function next_item(items) {
  return items[Math.floor(Math.random() * items.length)]
}


function next_unique_item(all_items,picked_items) {
  let not_filtered = next_item(all_items)
  while (picked_items.includes(not_filtered)) {
    not_filtered = next_item(all_items)
  }
  return not_filtered
}


function store_picks(){
  if(wordset.length > taken_item.length){
    let picked_item = next_unique_item(wordset,taken_item)
    taken_item.push(picked_item)
  }
  console.log(taken_item[taken_item.length-1])
  return taken_item[taken_item.length-1]
}
