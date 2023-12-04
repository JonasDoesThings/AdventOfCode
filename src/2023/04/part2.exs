defmodule Day04.Part2 do
  def solve(input) do
    original_cards =
      String.split(input, "\n", trim: true)
      |> Enum.map(fn s ->
        s
        |> String.trim_leading("Card ")
        |> String.split([":", "|"], trim: true)
      end)
      |> Enum.map(fn card ->
        [card_number, winning_numbers, card_numbers] = card
        card_number = String.to_integer(String.trim(card_number))
        winning_numbers = String.split(winning_numbers)
        card_numbers = String.split(card_numbers)

        won =
          card_numbers
          |> Enum.filter(fn x -> Enum.member?(winning_numbers, x) end)
          |> length

        if won > 0, do: Enum.to_list((card_number + 1)..(card_number + won)), else: []
      end)

    queue =
      Enum.to_list(1..length(original_cards))
      |> :queue.from_list()

    proccess_queue(original_cards, queue, 0)
  end

  def proccess_queue(original_cards, queue, counter) do
    {{:value, card_number}, q} = :queue.out(queue)

    cards_to_add = Enum.at(original_cards, card_number - 1)

    q =
      Enum.reduce(
        cards_to_add,
        q,
        fn x, q ->
          :queue.in(x, q)
        end
      )

    if not :queue.is_empty(q) do
      proccess_queue(original_cards, q, counter + 1)
    else
      counter + 1
    end
  end
end

{:ok, input} = File.read("in.txt")
IO.puts("4/2:")
IO.puts(Day04.Part2.solve(input))
