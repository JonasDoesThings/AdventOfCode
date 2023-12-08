defmodule Day08.Part2 do
  def solve(input) do
    input = input
    |> String.split("\n", trim: true)

    instructions = List.first(input) |> String.split("", trim: true)

    rows = input
    |> Enum.drop(1)
    |> Enum.reduce(%{}, fn row, acc ->
      [label, left, right] = String.split(row, ["=", ","], trim: true)
      |> Enum.map(fn s -> String.replace(s, ["(", ")", " "], "") end)
      Map.put(acc, label, {left, right})
    end)

    row_labels = Enum.filter(Map.keys(rows), fn label -> String.ends_with?(label, "A") end)
    parse_line(rows, instructions, row_labels)
  end

  def parse_line(rows, instructions, row_labels, instruction_index \\ 0, steps \\ 0) do


    if Enum.all?(row_labels, fn label -> String.ends_with?(label, "Z") end) do
      (steps)
    else
      row_labels = Enum.reduce(row_labels, [], fn label, acc ->
        {label_left, label_right} = Map.get(rows, label)
        case Enum.at(instructions, rem(instruction_index, length(instructions))) do
          "L" -> acc ++ [label_left]
          "R" -> acc ++ [label_right]
        end
      end)
      parse_line(rows, instructions, row_labels, instruction_index + 1, steps + 1)
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("08/02:")
IO.puts(Day08.Part2.solve(input))
