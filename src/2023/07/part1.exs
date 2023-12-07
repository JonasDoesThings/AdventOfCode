defmodule Day07.Part1 do
  defp is_five_of_kind(grouped_cards) do length(grouped_cards) == 1 end
  defp is_four_of_kind(grouped_cards) do Enum.any?(grouped_cards, fn x -> length(x) == 4 end) end
  defp is_full_house(grouped_cards) do length(grouped_cards) == 2 end
  defp is_three_of_kind(grouped_cards) do Enum.any?(grouped_cards, fn x -> length(x) == 3 end) end
  defp is_two_pairs(grouped_cards) do Enum.filter(grouped_cards, fn x -> length(x) == 2 end) |> length == 2 end
  defp is_one_pair(grouped_cards) do Enum.find(grouped_cards, fn x -> length(x) == 2 end) end

  @cardMappings %{"T" => "10", "J" => "11", "Q" => "12", "K" => "13", "A" => "14"}
  defp map_cards_str(cards_str) do
    cards_str
    |> String.split("", trim: true)
    |> Enum.map(fn x -> Map.get(@cardMappings, x, x) |> String.to_integer() end)
  end

  defp value_hands({cards, _}) do
    chunked_cards = map_cards_str(cards)
    |> Enum.sort()
    |> Enum.chunk_by(fn x -> x end)

    cond do
      is_five_of_kind(chunked_cards) -> 6
      is_four_of_kind(chunked_cards) -> 5
      is_full_house(chunked_cards) -> 4
      is_three_of_kind(chunked_cards) -> 3
      is_two_pairs(chunked_cards) -> 2
      is_one_pair(chunked_cards) -> 1
      true -> 0
    end
  end

  defp find_higher_card_in_hand({cards_a, _}, {cards_b, _}, index \\ 0) do
    diff = Enum.at(map_cards_str(cards_a), index) - Enum.at(map_cards_str(cards_b), index)
    case diff do
      0 -> find_higher_card_in_hand({cards_a, 0}, {cards_b, 0}, index + 1)
      _ -> diff < 0
    end
  end

  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn row ->
      [cards, bid] = String.split(row)
      {cards, String.to_integer(bid)}
    end)
    |> Enum.sort(fn (hand_a, hand_b) ->
      diff = value_hands(hand_a) - value_hands(hand_b)
      case diff do
         0 -> find_higher_card_in_hand(hand_a, hand_b)
        _ -> diff < 0
      end
    end)
    |> Enum.with_index(1)
    |> Enum.reduce(0, fn {{_, bid}, index}, acc -> acc + (bid * index) end)
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("07/01:")
IO.puts(Day07.Part1.solve(input))
