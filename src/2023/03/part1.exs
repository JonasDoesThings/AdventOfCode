defmodule Day03.Part1 do
  def solve(input) do
    matrix = input
    |> String.split("\n", trim: true)
    |> Enum.with_index()

    matrix
    |> Enum.map(&(parse_line(matrix, &1)))
    |> Enum.sum()
  end

  def parse_line(matrix, {row, row_index}) do
    {nums, _} = Enum.reduce(
      0..String.length(row)-1,
      {[], ""},
      fn (col_index, {nums, num}) ->
        symbol = String.at(row, col_index)

        if hd(String.to_charlist(symbol)) in ?0..?9 do
          num = num<>symbol
          if col_index == String.length(row)-1 do
            {nums ++ [num], num}
          else
            {nums, num}
          end
        else
          if(num != "") do
            {nums ++ [num], ""}
          else
            {nums, ""}
          end
        end
      end
    )

    {num_positions, _} = Enum.reduce(
      0..String.length(row)-1,
      {[], []},
      fn col_index, {positions, curr_pos} ->
        symbol = String.at(row, col_index)
        if hd(String.to_charlist(symbol)) in ?0..?9 do
          curr_pos = curr_pos ++ [col_index]
          if col_index == String.length(row)-1 do
            {positions ++ [curr_pos], curr_pos}
          else
            {positions, curr_pos}
          end
        else
          if length(curr_pos) > 0 do
            {positions ++ [curr_pos], []}
          else
            {positions, []}
          end
        end
      end
    )

    Enum.with_index(nums)
    |> Enum.map(
      fn {num, num_index} ->
        num_val = String.to_integer(num)
        num_pos = Enum.at(num_positions, num_index)
        num_pos_padded = pad_num_pos(num_pos, row)

        lookbehind = if List.first(num_pos)-1 >= 0, do: String.at(row, List.first(num_pos)-1) != ".", else: false
        looknext = if List.last(num_pos)+1 < String.length(row), do: String.at(row, List.last(num_pos)+1) != ".", else: false
        {prev_row, _} = if row_index-1 < 0, do: {nil, -1}, else: Enum.at(matrix, row_index-1)
        {next_row, _} = Enum.at(matrix, row_index+1, {nil, -1})

        cond do
          prev_row != nil and Enum.any?(num_pos_padded, fn i -> String.at(prev_row, i) != "." end) -> num_val
          next_row != nil and Enum.any?(num_pos_padded, fn i -> String.at(next_row, i) != "." end) -> num_val
          lookbehind or looknext -> num_val
          true -> 0
        end
      end
    )
    |> Enum.sum()
  end

  def pad_num_pos(num_pos, row) do
    num_pos = if List.first(num_pos)-1 > 0 do
      [List.first(num_pos)-1] ++ num_pos
    else
      num_pos
    end

    if List.last(num_pos) < String.length(row)-1 do
      num_pos ++ [List.last(num_pos)+1]
    else
      num_pos
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("3/1:")
IO.puts(Day03.Part1.solve(input))
