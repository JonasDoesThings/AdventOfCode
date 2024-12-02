defmodule Day02.Part1 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.count(fn val -> val == true end)
  end

  def parse_line(row) do
    parsed_row = row
    |> String.split(" ")
    |> Enum.map(&String.to_integer/1)

    [nil | parsed_row]
    |> Enum.zip(parsed_row)
    |> Enum.map(fn
      {nil, _} -> 0
      {prev, curr} -> curr - prev
    end)
    |> Enum.drop(1)
    |> (fn nums ->
        Enum.all?(nums, fn num -> num >= 1 and num <= 3 end) or
        Enum.all?(nums, fn num -> num <= -1 and num >= -3 end)
    end).()
  end
end

defmodule Day02.Part2 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.count(fn val -> val == true end)
  end

  def parse_line(row) do
    row
    |> String.split(" ")
    |> Enum.map(&String.to_integer/1)
    |> process_row()
  end

  def process_row(row, is_retry \\ false) do
    processed_row = [nil | row]
    |> Enum.zip(row)
    |> Enum.map(fn
      {nil, _} -> nil
      {prev, curr} -> prev - curr
    end)
    |> Enum.drop(1)

    must_be_positive = Enum.count(processed_row, fn num -> num >= 0 end) >= length(processed_row)/2
    faulty_value_index = case must_be_positive do
      true -> Enum.find_index(processed_row, fn num -> num < 1 or num > 3 end)
      false -> Enum.find_index(processed_row, fn num -> num > -1 or num < -3 end)
    end

    cond do
      faulty_value_index == nil -> true
      is_retry -> false
      # very cheap hack, just try if either works - no time for a better solution, lol
      true -> process_row(List.delete_at(row, faulty_value_index+1), true) or process_row(List.delete_at(row, faulty_value_index), true)
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("02/01:")
IO.inspect(Day02.Part1.solve(input))

IO.puts("02/02:")
IO.inspect(Day02.Part2.solve(input))
